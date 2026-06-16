"use client";

import Link from "next/link";
import { useState } from "react";
import { Zap, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#262626] backdrop-blur-xl bg-black/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] transition-shadow">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-white tracking-tight">
            ResumeFit <span className="text-blue-400">AI</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/#how-it-works" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            How It Works
          </a>
          <a href="/#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            Features
          </a>
          <Link
            href="/evaluate"
            className="bg-white text-black text-sm font-semibold px-5 py-2 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Try for Free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#262626] bg-[#0A0A0A] px-4 py-4 flex flex-col gap-4">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            How It Works
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Features
          </a>
          <Link
            href="/evaluate"
            className="bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-lg text-center hover:bg-slate-200 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Try for Free
          </Link>
        </div>
      )}
    </nav>
  );
}
