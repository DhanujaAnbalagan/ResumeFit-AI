"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { EvaluationResult } from "@/types/evaluation";

const colorMap = {
  green: {
    ring: "url(#greenGrad)",
    text: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    badge: "bg-green-500/20 text-green-300 border-green-500/30",
    gradStart: "#22c55e",
    gradEnd: "#4ade80",
  },
  blue: {
    ring: "url(#blueGrad)",
    text: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    gradStart: "#3b82f6",
    gradEnd: "#6366f1",
  },
  yellow: {
    ring: "url(#yellowGrad)",
    text: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
    badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    gradStart: "#eab308",
    gradEnd: "#f59e0b",
  },
  orange: {
    ring: "url(#orangeGrad)",
    text: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    badge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    gradStart: "#f97316",
    gradEnd: "#fb923c",
  },
  red: {
    ring: "url(#redGrad)",
    text: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    badge: "bg-red-500/20 text-red-300 border-red-500/30",
    gradStart: "#ef4444",
    gradEnd: "#f87171",
  },
};

const ratingEmoji: Record<string, string> = {
  green: "🟢",
  blue: "🔵",
  yellow: "🟡",
  orange: "🟠",
  red: "🔴",
};

interface OverallScoreProps {
  result: EvaluationResult;
}

export default function OverallScore({ result }: OverallScoreProps) {
  const { overallScore, rating, ratingColor } = result;
  const colors = colorMap[ratingColor] || colorMap.blue;
  const [displayScore, setDisplayScore] = useState(0);
  const circumference = 2 * Math.PI * 52; // r=52
  const dashOffset = circumference - (overallScore / 100) * circumference;

  // Animate counter
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const step = 16;
    const increment = overallScore / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= overallScore) {
        setDisplayScore(overallScore);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [overallScore]);

  return (
    <motion.div
      className={`bg-[#0A0A0A] p-8 sm:p-10 border border-[#262626] rounded-2xl flex flex-col items-center text-center shadow-xl relative overflow-hidden`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Score Ring */}
      <div className="relative w-44 h-44 mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <defs>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" /><stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#eab308" /><stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" /><stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
            <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" /><stop offset="100%" stopColor="#f87171" />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          {/* Progress */}
          <motion.circle
            cx="60" cy="60" r="52" fill="none"
            stroke={colors.ring}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`text-5xl font-black ${colors.text}`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {displayScore}
          </span>
          <span className="text-slate-500 text-sm font-medium">/ 100</span>
        </div>
      </div>

      {/* Rating badge */}
      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-semibold mb-4 ${colors.badge}`}>
        <span>{ratingEmoji[ratingColor]}</span>
        {rating}
      </div>

      {/* Recruiter Verdict Badge */}
      <div className="mb-8">
        <div className={`inline-flex items-center justify-center px-6 py-2 rounded-lg border-2 ${colors.text} ${colors.bg} font-black tracking-wide text-sm sm:text-base uppercase shadow-lg shadow-${colors.text}/10`}>
          {result.recruiterVerdict.recommendation === "SHORTLIST" && "LIKELY TO BE SHORTLISTED"}
          {result.recruiterVerdict.recommendation === "CONSIDER" && "MAY REQUIRE IMPROVEMENTS"}
          {result.recruiterVerdict.recommendation === "REJECT" && "DOES NOT MEET REQUIREMENTS"}
          {/* Fallback if it's not one of the standard three */}
          {!["SHORTLIST", "CONSIDER", "REJECT"].includes(result.recruiterVerdict.recommendation) && "STRONG MATCH"}
        </div>
      </div>

      {/* ATS Match Breakdown Mini */}
      <div className="w-full max-w-md bg-white/5 rounded-xl p-4 border border-white/10 mt-2">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-left">Match Breakdown</h4>
        <div className="flex flex-col gap-2 text-sm">
          {Object.entries(result.scores).map(([key, dim]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-slate-300">{dim.label}</span>
              <span className="font-semibold text-white">{dim.score} <span className="text-slate-500 text-xs">/ {dim.maxScore}</span></span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
