import type { EvaluationResult } from "@/types/evaluation";

const SCORING_RUBRIC = `
SCORING RUBRIC (you must follow this exactly):

1. ATS Keyword Match (max 30 points):
   - 25-30: 80%+ of key JD terms appear verbatim or semantically in resume
   - 15-24: 50-79% keyword overlap; some critical terms missing
   - 5-14:  30-49% overlap; major gaps in required terminology
   - 0-4:   <30% overlap; resume appears to be for a different role

2. Technical Skills (max 25 points):
   - 21-25: All required + most preferred skills present with appropriate depth
   - 13-20: Required skills present; preferred skills partially covered
   - 6-12:  Core skills present but gaps in required technologies
   - 0-5:   Significant missing skills; does not meet minimum bar

3. Relevant Experience (max 20 points):
   - 17-20: Role titles + domains closely match; quantified impact shown
   - 11-16: Relevant domain; some title/level mismatch
   - 5-10:  Adjacent experience; role pivot required
   - 0-4:   No directly relevant experience

4. Projects (max 12 points):
   - 10-12: 2+ projects directly relevant using required tech stack with outcomes
   - 6-9:   1-2 relevant projects; tech overlap partial
   - 2-5:   Projects present but not relevant to role
   - 0-1:   No projects or not demonstrated

5. Education (max 8 points):
   - 7-8: Directly relevant degree from recognized institution; matches JD requirements
   - 4-6: Related field or bootcamp with strong supplementary experience
   - 1-3: Unrelated degree but compensated by experience
   - 0:   No formal education listed or far below JD requirements

6. Soft Skills & Clarity (max 5 points):
   - 5:   Resume is clear, concise, well-structured; leadership/collaboration signals present
   - 3-4: Generally well-written; minor clarity issues
   - 1-2: Dense, unclear, or missing key soft skill signals
   - 0:   Poor structure, no soft skill indicators

Score bands:
- 85-100: "Excellent Match"    (ratingColor: "green")
- 70-84:  "Good Match"         (ratingColor: "blue")
- 55-69:  "Moderate Match"     (ratingColor: "yellow")
- 40-54:  "Weak Match"         (ratingColor: "orange")
- 0-39:   "Poor Match"         (ratingColor: "red")

Recommendation logic:
- SHORTLIST: score >= 70
- CONSIDER:  score >= 50 and < 70
- REJECT:    score < 50
`;

export function buildEvaluationPrompt(
  resumeText: string,
  jobDescription: string
): string {
  return `You are an expert technical recruiter and senior ATS (Applicant Tracking System) evaluator with 15+ years of experience in tech hiring.

Your task is to evaluate the provided resume against the job description and produce a structured JSON evaluation report.

${SCORING_RUBRIC}

RESUME:
---
${resumeText}
---

JOB DESCRIPTION:
---
${jobDescription}
---

INSTRUCTIONS:
1. Carefully read both the resume and job description.
2. Score each dimension according to the rubric above.
3. Identify matched keywords (terms that appear in both resume and JD).
4. Identify missing keywords (important JD terms absent from resume).
5. List 3-5 key strengths of this candidate for this role.
6. List 3-5 specific gaps or areas to improve.
7. Write a professional recruiter verdict paragraph (3-5 sentences).
8. The overallScore must equal the SUM of all 6 dimension scores.

CRITICAL: Respond ONLY with a valid JSON object matching this exact schema, no markdown, no explanation:

{
  "overallScore": <number 0-100>,
  "rating": <"Excellent Match" | "Good Match" | "Moderate Match" | "Weak Match" | "Poor Match">,
  "ratingColor": <"green" | "blue" | "yellow" | "orange" | "red">,
  "scores": {
    "atsKeywordMatch": { "score": <0-30>, "maxScore": 30, "label": "ATS Keyword Match", "feedback": "<1-2 sentences>" },
    "technicalSkills": { "score": <0-25>, "maxScore": 25, "label": "Technical Skills", "feedback": "<1-2 sentences>" },
    "relevantExperience": { "score": <0-20>, "maxScore": 20, "label": "Relevant Experience", "feedback": "<1-2 sentences>" },
    "projects": { "score": <0-12>, "maxScore": 12, "label": "Projects", "feedback": "<1-2 sentences>" },
    "education": { "score": <0-8>, "maxScore": 8, "label": "Education", "feedback": "<1-2 sentences>" },
    "softSkills": { "score": <0-5>, "maxScore": 5, "label": "Soft Skills & Clarity", "feedback": "<1-2 sentences>" }
  },
  "keywords": {
    "matched": ["<keyword1>", "<keyword2>", ...],
    "missing": ["<keyword1>", "<keyword2>", ...]
  },
  "strengths": ["<strength1>", "<strength2>", "<strength3>"],
  "gaps": ["<gap1>", "<gap2>", "<gap3>"],
  "recruiterVerdict": {
    "summary": "<professional recruiter-style paragraph>",
    "recommendation": <"SHORTLIST" | "CONSIDER" | "REJECT">,
    "confidence": <"HIGH" | "MEDIUM" | "LOW">
  }
}`;
}

export function getRatingFromScore(score: number): {
  rating: string;
  ratingColor: "green" | "blue" | "yellow" | "orange" | "red";
} {
  if (score >= 85) return { rating: "Excellent Match", ratingColor: "green" };
  if (score >= 70) return { rating: "Good Match", ratingColor: "blue" };
  if (score >= 55) return { rating: "Moderate Match", ratingColor: "yellow" };
  if (score >= 40) return { rating: "Weak Match", ratingColor: "orange" };
  return { rating: "Poor Match", ratingColor: "red" };
}

export function parseGeminiResponse(rawText: string): EvaluationResult {
  // Find the first '{' and the last '}' to extract the JSON object robustly
  const firstBrace = rawText.indexOf('{');
  const lastBrace = rawText.lastIndexOf('}');

  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
    throw new Error("Could not find a valid JSON object in the AI response.");
  }

  const cleaned = rawText.substring(firstBrace, lastBrace + 1);
  const parsed = JSON.parse(cleaned) as EvaluationResult;

  // Validate overallScore matches sum of dimension scores
  const dimensionSum = Object.values(parsed.scores).reduce(
    (acc, dim) => acc + dim.score,
    0
  );

  // If there's a discrepancy, use dimension sum as source of truth
  if (Math.abs(parsed.overallScore - dimensionSum) > 2) {
    parsed.overallScore = dimensionSum;
    const { rating, ratingColor } = getRatingFromScore(dimensionSum);
    parsed.rating = rating;
    parsed.ratingColor = ratingColor;
  }

  return parsed;
}
