"use client";

import { motion } from "framer-motion";
import { RotateCcw, Clock } from "lucide-react";
import type { EvaluationResult } from "@/types/evaluation";
import OverallScore from "./overall-score";
import ScoreCard from "./score-card";
import KeywordAnalysis from "./keyword-analysis";
import StrengthsGaps from "./strengths-gaps";
import RecruiterVerdict from "./recruiter-verdict";

interface ResultsDashboardProps {
  result: EvaluationResult;
  onReset: () => void;
}

export default function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
  const scoreEntries = Object.entries(result.scores);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-black">
            Evaluation Report
          </h1>
          <div className="flex items-center gap-2 mt-1.5 text-slate-500 text-sm">
            <Clock className="w-3.5 h-3.5" />
            {result.metadata?.evaluatedAt
              ? formatDate(result.metadata.evaluatedAt)
              : "Just now"}
            {result.metadata?.processingTimeMs && (
              <span className="text-slate-600">
                · {(result.metadata.processingTimeMs / 1000).toFixed(1)}s
              </span>
            )}
          </div>
        </div>

        <button
          id="re-evaluate-btn"
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#262626] bg-[#0A0A0A] text-sm font-semibold text-slate-300 hover:text-white hover:bg-[#111111] transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Evaluate Again
        </button>
      </motion.div>

      <div className="space-y-12">
        {/* Overall Score Hero (Top Center) */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <OverallScore result={result} />
          </div>
        </div>

        {/* Recruiter Verdict */}
        <div>
          <RecruiterVerdict verdict={result.recruiterVerdict} />
        </div>

        {/* 6 Score Cards Grid */}
        <div>
          <motion.h2
            className="text-lg font-bold mb-6 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
            Detailed Breakdown
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {scoreEntries.map(([, dimension], i) => (
              <ScoreCard
                key={dimension.label}
                dimension={dimension}
                delay={0.1 + i * 0.07}
              />
            ))}
          </div>
        </div>

        {/* Strengths & Gaps */}
        <div>
          <motion.h2
            className="text-lg font-bold mb-6 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
            Analysis
          </motion.h2>
          <StrengthsGaps strengths={result.strengths} gaps={result.gaps} />
        </div>

        {/* Keyword Analysis */}
        <div>
          <KeywordAnalysis keywords={result.keywords} />
        </div>
      </div>

      {/* Footer action */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <button
          onClick={() => window.print()}
          className="bg-white hover:bg-slate-200 text-black font-bold px-8 py-3.5 rounded-xl text-sm inline-flex items-center gap-2 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Evaluation Report
        </button>

        <button
          id="bottom-re-evaluate-btn"
          onClick={onReset}
          className="px-8 py-3.5 rounded-xl text-sm font-semibold text-slate-400 bg-[#0A0A0A] border border-[#262626] hover:bg-[#111111] hover:text-white transition-colors inline-flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Evaluate a Different Resume
        </button>
      </motion.div>
      <motion.p
        className="text-xs text-slate-600 mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        Model: {result.metadata?.model ?? "gemini-2.0-flash"} · Your data is never stored
      </motion.p>
    </div>
  );
}
