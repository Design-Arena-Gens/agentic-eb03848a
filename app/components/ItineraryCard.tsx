"use client";

import { DayItinerary } from "../types";
import { MapPin, Clock, DollarSign, Trash2, ArrowLeftRight } from "lucide-react";

interface ItineraryCardProps {
  dayItinerary: DayItinerary;
  onRemoveLocation: (day: number, locationId: string) => void;
  onSwapLocation: (day: number, locationId: string) => void;
  loading: boolean;
}

export default function ItineraryCard({
  dayItinerary,
  onRemoveLocation,
  onSwapLocation,
  loading,
}: ItineraryCardProps) {
  const dayColor = dayItinerary.day === 1 ? "blue" : "purple";
  const bgColor = dayItinerary.day === 1 ? "bg-blue-50" : "bg-purple-50";
  const borderColor =
    dayItinerary.day === 1 ? "border-blue-500" : "border-purple-500";
  const textColor = dayItinerary.day === 1 ? "text-blue-600" : "text-purple-600";

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${borderColor}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-xl font-bold ${textColor}`}>
          Day {dayItinerary.day}
        </h3>
        <span className="text-sm text-gray-600">{dayItinerary.date}</span>
      </div>

      <div className="space-y-4">
        {dayItinerary.locations.map((location, idx) => (
          <div
            key={location.id}
            className={`p-4 rounded-lg ${bgColor} border border-gray-200`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`font-bold ${textColor}`}>
                    {location.timeSlot}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {location.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {location.description}
                </p>
                <div className="flex items-center space-x-4 text-xs">
                  <span className="flex items-center space-x-1 text-gray-700">
                    <MapPin className="w-3 h-3" />
                    <span>{location.type}</span>
                  </span>
                  <span className="flex items-center space-x-1 text-gray-700">
                    <Clock className="w-3 h-3" />
                    <span>{formatDuration(location.duration)}</span>
                  </span>
                  <span className="flex items-center space-x-1 text-green-600">
                    <DollarSign className="w-3 h-3" />
                    <span>${location.cost.toFixed(2)}</span>
                  </span>
                </div>
              </div>

              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => onSwapLocation(dayItinerary.day, location.id)}
                  disabled={loading}
                  className="p-2 hover:bg-white rounded-lg transition-colors disabled:opacity-50"
                  title={`Move to Day ${dayItinerary.day === 1 ? 2 : 1}`}
                >
                  <ArrowLeftRight className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => onRemoveLocation(dayItinerary.day, location.id)}
                  disabled={loading}
                  className="p-2 hover:bg-white rounded-lg transition-colors disabled:opacity-50"
                  title="Remove location"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm">
        <span className="text-gray-700">
          <Clock className="w-4 h-4 inline mr-1" />
          Total: {formatDuration(dayItinerary.totalDuration)}
        </span>
        <span className="text-green-600 font-semibold">
          <DollarSign className="w-4 h-4 inline mr-1" />
          ${dayItinerary.totalCost.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
