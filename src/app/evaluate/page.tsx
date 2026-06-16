"use client";

import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import EvaluateForm from "@/components/evaluator/evaluate-form";
import ResultsDashboard from "@/components/results/results-dashboard";
import type { EvaluationResult } from "@/types/evaluation";

export default function EvaluatePage() {
  const [result, setResult] = useState<EvaluationResult | null>(null);

  const handleResult = (data: EvaluationResult) => {
    setResult(data);
    // Scroll to top to show results
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {result ? (
          <ResultsDashboard result={result} onReset={handleReset} />
        ) : (
          <EvaluateForm onResult={handleResult} />
        )}
      </main>
      <Footer />
    </>
  );
}
