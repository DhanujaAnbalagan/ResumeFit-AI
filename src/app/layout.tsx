import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ResumeFit AI — AI-Powered Resume Evaluator",
  description:
    "Get a recruiter-style AI evaluation of your resume against any job description. See your ATS score, keyword gaps, and actionable feedback in seconds.",
  keywords: [
    "resume evaluator",
    "ATS score",
    "AI resume checker",
    "job application",
    "resume feedback",
  ],
  openGraph: {
    title: "ResumeFit AI — Know Your Resume Score Before Recruiters Do",
    description:
      "AI-powered resume evaluation. Paste your resume and job description, get a detailed recruiter-style report instantly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-black text-slate-50 min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
