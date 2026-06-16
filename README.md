# ResumeFit AI

> Know Your Resume Score Before Recruiters Do

ResumeFit AI is an AI-powered resume evaluation platform that analyzes resumes against job descriptions and generates recruiter-style feedback, ATS scores, skill gap analysis, and improvement recommendations.

Built with Next.js, TypeScript, Tailwind CSS, and Google Gemini AI.

---

## Live Demo

🔗 Live Application: 


---

## Features

### AI Resume Evaluation

Upload your resume and compare it against any job description using Google Gemini AI.

### ATS Match Score

Get a detailed ATS compatibility score based on skills, experience, education, and keyword relevance.

### Skill Gap Analysis

Identify missing skills and keywords that may reduce your chances of getting shortlisted.

### Recruiter Verdict

Receive a recruiter-style recommendation:

* Shortlist
* Consider
* Reject

### Detailed Feedback

Get actionable suggestions to improve your resume for specific job roles.

### PDF Resume Support

Upload PDF resumes for automated text extraction and evaluation.

### Professional Report Generation

Generate structured evaluation reports with transparent scoring criteria.

---

## Scoring Framework

ResumeFit AI evaluates candidates across multiple dimensions:

| Category              | Weight |
| --------------------- | ------ |
| ATS Keyword Match     | 30     |
| Technical Skills      | 25     |
| Relevant Experience   | 20     |
| Projects              | 12     |
| Education             | 8      |
| Soft Skills & Clarity | 5      |

**Total Score: 100**

---

## Tech Stack

### Frontend

* Next.js 15
* TypeScript
* Tailwind CSS

### AI

* Google Gemini 2.5 Flash

### PDF Processing

* PDF Text Extraction

### Deployment

* Vercel

### Version Control

* GitHub

---

## How It Works

### Step 1

Upload your resume in PDF format.

### Step 2

Paste the target job description.

### Step 3

ResumeFit AI analyzes:

* Skills Match
* Experience Relevance
* Project Alignment
* Education Requirements
* ATS Keywords

### Step 4

Receive:

* ATS Score
* Match Breakdown
* Strengths
* Areas for Improvement
* Recruiter Verdict

---

## Installation

Clone the repository:

```bash
git clone https://github.com/DhanujaAnbalagan/ResumeFit-AI.git
cd ResumeFit-AI
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Environment Variables

Required:

```env
GEMINI_API_KEY=your_api_key
```

---

## Project Structure

```text
src/
├── app/
│   ├── api/
│   ├── evaluate/
│   └── page.tsx
├── components/
├── lib/
├── types/
└── utils/
```

---


## Built For

Digital Heroes Developer Trial Task

Requirements Completed:

* Working AI-powered tool
* Public GitHub repository
* Vercel deployment
* Portfolio-ready project
* Resume evaluation functionality
* Digital Heroes integration

---

## Author

**Dhanuja Anbalagan**

Computer Science Engineering Student
Amrita Vishwa Vidyapeetham

---

## License

This project is intended for educational, portfolio, and demonstration purposes.
