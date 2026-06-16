"use client";

import { motion } from "framer-motion";
import { UserCircle, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import type { RecruiterVerdict as RecruiterVerdictType } from "@/types/evaluation";

interface RecruiterVerdictProps {
  verdict: RecruiterVerdictType;
}

const recommendationConfig = {
  SHORTLIST: {
    icon: ThumbsUp,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/25",
    label: "Shortlist Candidate",
  },
  CONSIDER: {
    icon: Minus,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/25",
    label: "Consider with Reservations",
  },
  REJECT: {
    icon: ThumbsDown,
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/25",
    label: "Not Recommended",
  },
};

const confidenceMap = {
  HIGH: { label: "High Confidence", color: "text-green-400" },
  MEDIUM: { label: "Medium Confidence", color: "text-yellow-400" },
  LOW: { label: "Low Confidence", color: "text-slate-400" },
};

export default function RecruiterVerdict({ verdict }: RecruiterVerdictProps) {
  const config = recommendationConfig[verdict.recommendation];
  const confidence = confidenceMap[verdict.confidence];
  const Icon = config.icon;

  return (
    <motion.div
      className="bg-[#0A0A0A] p-6 sm:p-8 border border-[#262626] rounded-2xl shadow-xl relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <h3 className="font-bold text-base mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
        Recruiter Verdict
      </h3>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Avatar + recommendation */}
        <div className="flex flex-col items-center gap-3 sm:w-44 shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border border-indigo-500/20 flex items-center justify-center">
            <UserCircle className="w-9 h-9 text-indigo-400" />
          </div>
          <span className="text-xs text-slate-500 font-medium">AI Recruiter</span>

          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-bold ${config.bg} ${config.color}`}>
            <Icon className="w-4 h-4" />
            {verdict.recommendation}
          </div>

          <span className={`text-xs font-medium ${confidence.color}`}>
            {confidence.label}
          </span>
        </div>

        {/* Verdict text */}
        <div className="flex-1">
          <div className="bg-white/3 rounded-xl p-5 border border-white/5 relative">
            {/* Speech bubble tail */}
            <div className="hidden sm:block absolute left-0 top-6 -translate-x-2 w-3 h-3 bg-white/3 border-l border-b border-white/5 rotate-45" />
            <p className="text-sm text-slate-300 leading-relaxed italic">
              &ldquo;{verdict.summary}&rdquo;
            </p>
          </div>

          <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-bold ${config.bg} ${config.color}`}>
            <Icon className="w-4 h-4" />
            Final Recommendation: {config.label}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
