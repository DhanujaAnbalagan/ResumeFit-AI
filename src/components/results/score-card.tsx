"use client";

import { motion } from "framer-motion";
import type { ScoreDimension } from "@/types/evaluation";

interface ScoreCardProps {
  dimension: ScoreDimension;
  delay?: number;
}

function getBarColor(percentage: number): string {
  if (percentage >= 80) return "from-green-500 to-emerald-400";
  if (percentage >= 65) return "from-blue-500 to-indigo-500";
  if (percentage >= 50) return "from-yellow-500 to-amber-400";
  if (percentage >= 35) return "from-orange-500 to-orange-400";
  return "from-red-500 to-red-400";
}

function getScoreColor(percentage: number): string {
  if (percentage >= 80) return "text-green-400";
  if (percentage >= 65) return "text-blue-400";
  if (percentage >= 50) return "text-yellow-400";
  if (percentage >= 35) return "text-orange-400";
  return "text-red-400";
}

export default function ScoreCard({ dimension, delay = 0 }: ScoreCardProps) {
  const percentage = Math.round((dimension.score / dimension.maxScore) * 100);
  const barColor = getBarColor(percentage);
  const scoreColor = getScoreColor(percentage);

  return (
    <motion.div
      className="bg-[#0A0A0A] p-5 border border-[#262626] rounded-xl hover:border-[#404040] transition-colors relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm font-semibold text-slate-300 leading-tight">
          {dimension.label}
        </span>
        <span className={`text-base font-black ${scoreColor} shrink-0 ml-2`} style={{ fontFamily: "Outfit, sans-serif" }}>
          {dimension.score}
          <span className="text-slate-600 text-xs font-normal">/{dimension.maxScore}</span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-3">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Percentage label */}
      <div className="flex justify-between items-start">
        <p className="text-xs text-slate-500 leading-relaxed flex-1">
          {dimension.feedback}
        </p>
        <span className={`text-xs font-bold ml-2 ${scoreColor}`}>{percentage}%</span>
      </div>
    </motion.div>
  );
}
