"use client";

import { useState } from "react";
import TravelInput from "./components/TravelInput";
import TravelPlan from "./components/TravelPlan";
import { TravelPlanData } from "./types";

export default function Home() {
  const [plan, setPlan] = useState<TravelPlanData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setPlan(data);
    } catch (error) {
      console.error("Error generating plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptimizePlan = async (updatedPlan: TravelPlanData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/optimize-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: updatedPlan }),
      });
      const data = await response.json();
      setPlan(data);
    } catch (error) {
      console.error("Error optimizing plan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            🌍 AI Travel Planner
          </h1>
          <p className="text-gray-600 text-lg">
            Autonomous intelligent agent for your perfect trip
          </p>
        </header>

        {!plan && (
          <TravelInput onGenerate={handleGeneratePlan} loading={loading} />
        )}

        {plan && (
          <TravelPlan
            plan={plan}
            onOptimize={handleOptimizePlan}
            onReset={() => setPlan(null)}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
