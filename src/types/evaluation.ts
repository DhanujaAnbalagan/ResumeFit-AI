export type RatingColor = "green" | "blue" | "yellow" | "orange" | "red";
export type Recommendation = "SHORTLIST" | "CONSIDER" | "REJECT";
export type ConfidenceLevel = "HIGH" | "MEDIUM" | "LOW";

export interface ScoreDimension {
  score: number;
  maxScore: number;
  label: string;
  feedback: string;
}

export interface EvaluationScores {
  atsKeywordMatch: ScoreDimension;
  technicalSkills: ScoreDimension;
  relevantExperience: ScoreDimension;
  projects: ScoreDimension;
  education: ScoreDimension;
  softSkills: ScoreDimension;
}

export interface KeywordAnalysis {
  matched: string[];
  missing: string[];
}

export interface RecruiterVerdict {
  summary: string;
  recommendation: Recommendation;
  confidence: ConfidenceLevel;
}

export interface EvaluationMetadata {
  evaluatedAt: string;
  model: string;
  processingTimeMs: number;
}

export interface EvaluationResult {
  overallScore: number;
  rating: string;
  ratingColor: RatingColor;
  scores: EvaluationScores;
  keywords: KeywordAnalysis;
  strengths: string[];
  gaps: string[];
  recruiterVerdict: RecruiterVerdict;
  metadata: EvaluationMetadata;
}

export interface EvaluateRequest {
  resumeText: string;
  jobDescription: string;
}

export interface EvaluateResponse {
  success: boolean;
  data?: EvaluationResult;
  error?: {
    code: string;
    message: string;
    details?: string;
  };
}
