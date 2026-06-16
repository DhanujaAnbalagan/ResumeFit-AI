"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
  Upload,
  BarChart3,
  ArrowRight,
  Sparkles,
  FileText,
  Brain,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "ATS Score Analysis",
    description:
      "Get your exact ATS match percentage against any job description — the same way recruiters' systems score you.",
    className: "md:col-span-4 lg:col-span-4",
  },
  {
    icon: Brain,
    title: "AI Keyword Matching",
    description:
      "See exactly which keywords you matched and which critical ones are missing, powered by advanced language models.",
    className: "md:col-span-4 lg:col-span-2",
  },
  {
    icon: TrendingUp,
    title: "6-Dimension Scoring",
    description:
      "Evaluate technical skills, experience, projects, education, and soft skills across 6 transparent dimensions.",
    className: "md:col-span-4 lg:col-span-2",
  },
  {
    icon: CheckCircle,
    title: "Recruiter Verdict",
    description:
      "Receive a professional recruiter-style summary with a clear SHORTLIST / CONSIDER / REJECT recommendation.",
    className: "md:col-span-4 lg:col-span-4",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    description:
      "Your resume is evaluated completely in memory. We never store, train on, or share your personal data.",
    className: "md:col-span-2 lg:col-span-3",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "No waiting for humans. Get a detailed, actionable evaluation report in under 10 seconds.",
    className: "md:col-span-2 lg:col-span-3",
  },
];

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Resume",
    description: "Upload a PDF or paste your resume text directly.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Paste Job Description",
    description: "Copy the JD from any job board and paste it in.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Get Your Report",
    description:
      "Receive a detailed, recruiter-style AI evaluation in seconds.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden selection:bg-blue-500/30">
      
      {/* 1. HERO SECTION (Split Layout) */}
      <section className="relative pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Soft background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col items-start text-left relative z-10 max-w-2xl"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs font-medium">
                <Sparkles className="w-3 h-3 text-blue-400" />
                AI-Powered ATS Evaluator
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-white"
            >
              Know Your Resume Score{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                Before Recruiters Do.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-400 mb-12 max-w-xl leading-relaxed"
            >
              Paste your resume and job description. In 10 seconds, get a
              detailed recruiter-style AI evaluation — ATS score, keyword gaps,
              and actionable feedback to help you land the interview.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="/evaluate"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white text-black font-semibold text-sm hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                Evaluate Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#111111] border border-[#262626] text-white font-semibold text-sm hover:bg-[#1A1A1A] transition-colors text-center"
              >
                View Features
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Mockup Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: 10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{ perspective: "1000px" }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full max-w-lg mx-auto bg-[#0A0A0A] border border-[#262626] rounded-2xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* Mockup Header */}
              <div className="h-10 bg-[#111111] border-b border-[#262626] flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-[#262626]" />
                <div className="w-3 h-3 rounded-full bg-[#262626]" />
                <div className="w-3 h-3 rounded-full bg-[#262626]" />
              </div>
              {/* Mockup Body */}
              <div className="p-8 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full border-[6px] border-[#262626] flex items-center justify-center mb-6 relative">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#3b82f6" strokeWidth="6" strokeDasharray="339" strokeDashoffset="50" strokeLinecap="round" />
                  </svg>
                  <span className="text-4xl font-bold text-white tracking-tighter">85</span>
                </div>
                <div className="w-full space-y-4">
                  {[
                    { l: "Technical Skills", w: "80%" },
                    { l: "Experience", w: "90%" },
                    { l: "Projects", w: "60%" }
                  ].map((s, i) => (
                    <div key={i} className="w-full">
                      <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                        <span>{s.l}</span>
                      </div>
                      <div className="h-1.5 bg-[#262626] rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: s.w }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. HOW IT WORKS (Timeline) */}
      <section className="py-24 px-6 lg:px-8 border-t border-[#262626] bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight">How it works</h2>
            <p className="text-slate-400 mt-2">Three simple steps to perfect your application.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line (Desktop only) */}
            <div className="hidden md:block absolute top-6 left-12 right-12 h-px bg-gradient-to-r from-blue-500/0 via-[#262626] to-blue-500/0" />
            
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative pt-6 md:pt-12 text-center"
              >
                {/* Step indicator */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#111111] border border-[#262626] rounded-full flex items-center justify-center text-sm font-bold text-slate-300 z-10 shadow-[0_0_0_8px_#0A0A0A]">
                  {step.number}
                </div>
                
                <div className="mt-8 md:mt-4">
                  <div className="w-10 h-10 bg-[#111111] border border-[#262626] rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <step.icon className="w-5 h-5 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURES (Grid) */}
      <section id="features" className="py-24 px-6 lg:px-8 border-t border-[#262626]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white tracking-tight">Everything you need</h2>
            <p className="text-slate-400 mt-2">Professional tools designed for modern job seekers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`h-full flex flex-col p-8 rounded-2xl bg-[#0A0A0A] border border-[#262626] hover:bg-[#111111] transition-colors ${feature.className}`}
              >
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-32 px-6 lg:px-8 border-t border-[#262626] bg-[#0A0A0A]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-white tracking-tight mb-6">
            Ready to see your score?
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">
            Free, instant, and no sign-up required. Get your recruiter-style evaluation in under 10 seconds.
          </p>
          <Link
            href="/evaluate"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-black font-semibold text-sm hover:bg-slate-200 transition-colors"
          >
            Evaluate My Resume Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
