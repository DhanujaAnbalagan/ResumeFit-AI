"use client";

import { motion } from "framer-motion";
import { Zap, AlertTriangle } from "lucide-react";

interface StrengthsGapsProps {
  strengths: string[];
  gaps: string[];
}

export default function StrengthsGaps({ strengths, gaps }: StrengthsGapsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Strengths */}
      <motion.div
        className="bg-[#0A0A0A] p-6 border border-[#262626] rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h3 className="font-bold text-base mb-4 flex items-center gap-2 text-green-400">
          <Zap className="w-4 h-4" />
          Strengths
        </h3>
        <ul className="space-y-3">
          {strengths.map((strength, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 text-sm text-slate-300"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
              {strength}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Gaps */}
      <motion.div
        className="bg-[#0A0A0A] p-6 border border-[#262626] rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h3 className="font-bold text-base mb-4 flex items-center gap-2 text-orange-400">
          <AlertTriangle className="w-4 h-4" />
          Areas to Improve
        </h3>
        <ul className="space-y-3">
          {gaps.map((gap, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 text-sm text-slate-300"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
              {gap}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
