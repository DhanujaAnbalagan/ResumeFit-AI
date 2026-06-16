import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#262626] bg-[#0A0A0A] mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex flex-col items-center justify-between gap-6">
        {/* Top brand & Built for Digital Heroes button */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white font-semibold">ResumeFit <span className="text-blue-400">AI</span></span>
          </div>
          
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white px-6 py-2.5 rounded-full text-black text-sm font-bold shadow-lg hover:bg-slate-200 transition-colors"
          >
            Built for Digital Heroes
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#262626]" />

        {/* Bottom text */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 text-sm text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <span className="font-medium text-slate-300">DHANUJA A</span>
            <span className="hidden sm:inline text-[#262626]">|</span>
            <a href="mailto:dhanudhanuja5@gmail.com" className="hover:text-white transition-colors">
              dhanudhanuja5@gmail.com
            </a>
            <span className="hidden sm:inline text-[#262626]">|</span>
            <a href="https://github.com/DhanujaAnbalagan/ResumeFit-AI" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
          </div>
          <span>Your resume is never stored. Evaluated safely.</span>
        </div>
      </div>
    </footer>
  );
}
