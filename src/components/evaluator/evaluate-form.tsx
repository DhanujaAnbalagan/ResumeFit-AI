"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, AlertCircle, Loader2, Sparkles, ChevronRight, ArrowRight } from "lucide-react";
import type { EvaluationResult } from "@/types/evaluation";

interface EvaluateFormProps {
  onResult: (result: EvaluationResult) => void;
}

type ResumeTab = "upload" | "paste";

export default function EvaluateForm({ onResult }: EvaluateFormProps) {
  const [resumeTab, setResumeTab] = useState<ResumeTab>("upload");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState("Analyzing your resume...");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadingMessages = [
    "Analyzing your resume...",
    "Scanning job description keywords...",
    "Calculating ATS match score...",
    "Generating recruiter verdict...",
    "Preparing your report...",
  ];

  const hasResume =
    resumeTab === "upload" ? !!resumeFile : resumeText.trim().length >= 100;
  const hasJD = jobDescription.trim().length >= 50;
  const canSubmit = hasResume && hasJD && !isLoading;

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be under 5MB.");
      return;
    }
    setError(null);
    setResumeFile(file);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setError(null);
    setIsLoading(true);

    // Cycle through loading messages
    let msgIndex = 0;
    const interval = setInterval(() => {
      msgIndex = (msgIndex + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[msgIndex]);
    }, 2000);

    try {
      let finalResumeText = resumeText;

      // Parse PDF client-side if file uploaded
      if (resumeTab === "upload" && resumeFile) {
        const formData = new FormData();
        formData.append("resume", resumeFile);

        const parseRes = await fetch("/api/parse-pdf", {
          method: "POST",
          body: formData,
        });

        if (!parseRes.ok) {
          throw new Error("Failed to parse PDF. Please try the paste option.");
        }

        const parseData = await parseRes.json();
        finalResumeText = parseData.text;
      }

      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: finalResumeText,
          jobDescription: jobDescription.trim(),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        // Handle both string errors (new format) and object errors (old format) just in case
        const errorMsg = typeof data.error === 'string' 
          ? data.error 
          : data.error?.message || "Evaluation failed. Please try again.";
        throw new Error(errorMsg);
      }

      onResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      clearInterval(interval);
      setIsLoading(false);
      setLoadingMessage("Analyzing your resume...");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          AI-Powered Evaluation
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight text-white">
          Evaluate Your Resume
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Upload your resume and paste the job description below. We'll analyze the match and generate your report in seconds.
        </p>
      </motion.div>

      {/* Error banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Two-panel input */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Left: Resume */}
        <div className="bg-[#0A0A0A] border border-[#262626] rounded-2xl p-6 flex flex-col shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-white">Your Resume</h2>
            <div className="flex gap-1 bg-[#111111] border border-[#262626] rounded-lg p-1">
              {(["upload", "paste"] as ResumeTab[]).map((tab) => (
                <button
                  key={tab}
                  id={`resume-tab-${tab}`}
                  onClick={() => { setResumeTab(tab); setError(null); }}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                    resumeTab === tab
                      ? "bg-[#262626] text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab === "upload" ? "📎 Upload PDF" : "📝 Paste Text"}
                </button>
              ))}
            </div>
          </div>

          {resumeTab === "upload" ? (
            <div
              id="pdf-drop-zone"
              className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all min-h-[280px] ${
                isDragging
                  ? "border-blue-500 bg-blue-500/5"
                  : resumeFile
                  ? "border-green-500/50 bg-green-500/5"
                  : "border-[#262626] bg-[#111111] hover:border-[#404040]"
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                id="pdf-file-input"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              {resumeFile ? (
                <>
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-green-400">{resumeFile.name}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {(resumeFile.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                  <button
                    id="remove-file-btn"
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors mt-2 px-3 py-1.5 rounded-md bg-[#1A1A1A] border border-[#262626]"
                    onClick={(e) => { e.stopPropagation(); setResumeFile(null); }}
                  >
                    <X className="w-3 h-3" />
                    Remove File
                  </button>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-lg bg-[#1A1A1A] border border-[#262626] flex items-center justify-center">
                    <Upload className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-300">
                      Drop your PDF here
                    </p>
                    <p className="text-xs text-slate-500 mt-1">or click to browse</p>
                  </div>
                  <p className="text-xs text-slate-600">Max file size: 5MB</p>
                </>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <textarea
                id="resume-text-input"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                className="flex-1 min-h-[280px] w-full bg-[#111111] border border-[#262626] rounded-xl p-4 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
              <div className="flex justify-between mt-3 text-xs text-slate-500 px-1">
                <span>{resumeText.length < 100 ? `${100 - resumeText.length} more chars needed` : "✓ Minimum length met"}</span>
                <span>{resumeText.length.toLocaleString()} chars</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Job Description */}
        <div className="bg-[#0A0A0A] border border-[#262626] rounded-2xl p-6 flex flex-col shadow-xl">
          <h2 className="font-semibold text-white mb-6">Job Description</h2>
          <textarea
            id="job-description-input"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here...

Include:
• Role title
• Responsibilities
• Required skills & qualifications"
            className="flex-1 min-h-[280px] w-full bg-[#111111] border border-[#262626] rounded-xl p-4 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
          <div className="flex justify-between mt-3 text-xs text-slate-500 px-1">
            <span>{jobDescription.length < 50 ? `${50 - jobDescription.length} more chars needed` : "✓ Minimum length met"}</span>
            <span>{jobDescription.length.toLocaleString()} chars</span>
          </div>
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        className="max-w-md mx-auto"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <button
          id="evaluate-submit-btn"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
            canSubmit
              ? "bg-white text-black hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-pointer"
              : "bg-[#111111] text-slate-500 border border-[#262626] cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{loadingMessage}</span>
            </>
          ) : (
            <>
              Evaluate My Resume
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {!canSubmit && !isLoading && (
          <p className="text-center text-xs text-slate-500 mt-4">
            {!hasResume && !hasJD
              ? "Upload resume and job description to continue"
              : !hasResume
              ? "Upload resume to continue"
              : "Add a job description to continue"}
          </p>
        )}
      </motion.div>
    </div>
  );
}
