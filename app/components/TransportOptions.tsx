"use client";

import { TransportOption } from "../types";
import { Plane, Train, Bus, Clock, DollarSign } from "lucide-react";

interface TransportOptionsProps {
  options: TransportOption[];
  onSelectTransport: (id: string) => void;
  loading: boolean;
}

export default function TransportOptions({
  options,
  onSelectTransport,
  loading,
}: TransportOptionsProps) {
  const getIcon = (mode: string) => {
    switch (mode) {
      case "flight":
        return <Plane className="w-6 h-6" />;
      case "train":
        return <Train className="w-6 h-6" />;
      case "bus":
        return <Bus className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        🚗 Transport Options
      </h3>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelectTransport(option.id)}
            disabled={loading}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              option.selected
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-lg ${
                    option.selected ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                >
                  {getIcon(option.mode)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 capitalize">
                    {option.mode} - {option.carrier}
                  </p>
                  <p className="text-sm text-gray-600">
                    {option.departureTime} → {option.arrivalTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-gray-700">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {formatDuration(option.duration)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-green-600">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-bold">
                      {option.cost.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
