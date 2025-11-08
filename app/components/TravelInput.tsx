"use client";

import { useState } from "react";
import { Plane, Loader2 } from "lucide-react";

interface TravelInputProps {
  onGenerate: (query: string) => void;
  loading: boolean;
}

export default function TravelInput({ onGenerate, loading }: TravelInputProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onGenerate(query);
    }
  };

  const examples = [
    "Plan a 2-day trip to Tokyo from New Delhi",
    "3-day adventure in Paris from London",
    "Weekend getaway to Barcelona from Madrid",
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="travel-query"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              What's your travel goal?
            </label>
            <textarea
              id="travel-query"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900"
              placeholder="e.g., Plan a 2-day trip to Tokyo from New Delhi"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>AI Agent Planning...</span>
              </>
            ) : (
              <>
                <Plane className="w-5 h-5" />
                <span>Generate Travel Plan</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-3">Try these examples:</p>
          <div className="space-y-2">
            {examples.map((example, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(example)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                disabled={loading}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
