"use client";

import { useState } from "react";
import { TravelPlanData } from "../types";
import TransportOptions from "./TransportOptions";
import ItineraryCard from "./ItineraryCard";
import TravelMap from "./TravelMap";
import { ArrowLeft, DollarSign, Clock, Sparkles } from "lucide-react";

interface TravelPlanProps {
  plan: TravelPlanData;
  onOptimize: (plan: TravelPlanData) => void;
  onReset: () => void;
  loading: boolean;
}

export default function TravelPlan({
  plan,
  onOptimize,
  onReset,
  loading,
}: TravelPlanProps) {
  const [localPlan, setLocalPlan] = useState(plan);

  const handleTransportChange = (transportId: string) => {
    const updatedPlan = {
      ...localPlan,
      transportOptions: localPlan.transportOptions.map((t) => ({
        ...t,
        selected: t.id === transportId,
      })),
    };
    setLocalPlan(updatedPlan);
    onOptimize(updatedPlan);
  };

  const handleRemoveLocation = (day: number, locationId: string) => {
    const updatedItinerary = localPlan.itinerary.map((dayPlan) => {
      if (dayPlan.day === day) {
        return {
          ...dayPlan,
          locations: dayPlan.locations.filter((loc) => loc.id !== locationId),
        };
      }
      return dayPlan;
    });

    const updatedPlan = {
      ...localPlan,
      itinerary: updatedItinerary,
    };
    setLocalPlan(updatedPlan);
    onOptimize(updatedPlan);
  };

  const handleSwapLocation = (day: number, locationId: string) => {
    // Move location to the other day
    const otherDay = day === 1 ? 2 : 1;
    const location = localPlan.itinerary[day - 1].locations.find(
      (loc) => loc.id === locationId
    );

    if (!location) return;

    const updatedItinerary = localPlan.itinerary.map((dayPlan) => {
      if (dayPlan.day === day) {
        return {
          ...dayPlan,
          locations: dayPlan.locations.filter((loc) => loc.id !== locationId),
        };
      } else if (dayPlan.day === otherDay) {
        return {
          ...dayPlan,
          locations: [...dayPlan.locations, location],
        };
      }
      return dayPlan;
    });

    const updatedPlan = {
      ...localPlan,
      itinerary: updatedItinerary,
    };
    setLocalPlan(updatedPlan);
    onOptimize(updatedPlan);
  };

  const selectedTransport = localPlan.transportOptions.find((t) => t.selected);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>New Search</span>
        </button>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-gray-700">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="font-semibold">
              Total: ${localPlan.totalCost.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="font-semibold">{localPlan.duration} Days</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-900">
            {localPlan.origin} → {localPlan.destination}
          </h2>
        </div>

        <div className="space-y-4 text-sm">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-900 mb-1">
              🚀 Transport Choice
            </p>
            <p className="text-gray-700">{localPlan.reasoning.transportChoice}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-900 mb-1">
              🗺️ Route Optimization
            </p>
            <p className="text-gray-700">
              {localPlan.reasoning.routeOptimization}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-900 mb-1">⏰ Time Management</p>
            <p className="text-gray-700">{localPlan.reasoning.timeManagement}</p>
          </div>
        </div>
      </div>

      <TransportOptions
        options={localPlan.transportOptions}
        onSelectTransport={handleTransportChange}
        loading={loading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {localPlan.itinerary.map((day) => (
            <ItineraryCard
              key={day.day}
              dayItinerary={day}
              onRemoveLocation={handleRemoveLocation}
              onSwapLocation={handleSwapLocation}
              loading={loading}
            />
          ))}
        </div>

        <div className="lg:sticky lg:top-4 h-[600px]">
          <TravelMap plan={localPlan} />
        </div>
      </div>
    </div>
  );
}
