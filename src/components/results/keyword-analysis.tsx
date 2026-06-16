"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import type { KeywordAnalysis as KeywordAnalysisType } from "@/types/evaluation";

interface KeywordAnalysisProps {
  keywords: KeywordAnalysisType;
}

export default function KeywordAnalysis({ keywords }: KeywordAnalysisProps) {
  return (
    <motion.div
      className="bg-[#0A0A0A] p-6 border border-[#262626] rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <h3 className="font-bold text-base mb-5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
        Keyword Analysis
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Matched */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-green-400">
              Matched ({keywords.matched.length})
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywords.matched.length > 0 ? (
              keywords.matched.map((kw, i) => (
                <motion.span
                  key={kw}
                  className="chip-matched"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.04 }}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {kw}
                </motion.span>
              ))
            ) : (
              <span className="text-slate-600 text-sm">No matches found</span>
            )}
          </div>
        </div>

        {/* Missing */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-red-400">
              Missing ({keywords.missing.length})
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywords.missing.length > 0 ? (
              keywords.missing.map((kw, i) => (
                <motion.span
                  key={kw}
                  className="chip-missing"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.04 }}
                >
                  <XCircle className="w-3 h-3" />
                  {kw}
                </motion.span>
              ))
            ) : (
              <span className="text-slate-600 text-sm">No critical gaps</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
