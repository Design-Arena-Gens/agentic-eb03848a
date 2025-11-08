"use client";

import { useEffect, useRef, useState } from "react";
import { TravelPlanData } from "../types";

interface TravelMapProps {
  plan: TravelPlanData;
}

export default function TravelMap({ plan }: TravelMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Simple static map implementation using Google Static Maps API
    const markers: string[] = [];
    const paths: string[] = [];

    // Add origin marker
    markers.push(
      `color:green|label:S|${plan.originCoords[1]},${plan.originCoords[0]}`
    );

    // Add destination marker
    markers.push(
      `color:red|label:E|${plan.destinationCoords[1]},${plan.destinationCoords[0]}`
    );

    // Add day 1 locations (blue)
    plan.itinerary[0]?.locations.forEach((loc, idx) => {
      markers.push(
        `color:blue|label:${idx + 1}|${loc.latitude},${loc.longitude}`
      );
    });

    // Add day 2 locations (purple)
    plan.itinerary[1]?.locations.forEach((loc, idx) => {
      markers.push(
        `color:purple|label:${idx + 1}|${loc.latitude},${loc.longitude}`
      );
    });

    // Create path for day 1
    if (plan.itinerary[0]?.locations.length > 0) {
      const day1Path = plan.itinerary[0].locations
        .map((loc) => `${loc.latitude},${loc.longitude}`)
        .join("|");
      paths.push(`color:0x0000ff80|weight:3|${day1Path}`);
    }

    // Create path for day 2
    if (plan.itinerary[1]?.locations.length > 0) {
      const day2Path = plan.itinerary[1].locations
        .map((loc) => `${loc.latitude},${loc.longitude}`)
        .join("|");
      paths.push(`color:0x800080ff|weight:3|${day2Path}`);
    }

    const markerParams = markers.map((m) => `markers=${m}`).join("&");
    const pathParams = paths.map((p) => `path=${p}`).join("&");

    // Using OpenStreetMap static map tile service as fallback
    const centerLat =
      (plan.originCoords[1] + plan.destinationCoords[1]) / 2;
    const centerLon =
      (plan.originCoords[0] + plan.destinationCoords[0]) / 2;

    mapContainer.current.innerHTML = `
      <div class="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-full h-full relative">
            <iframe
              width="100%"
              height="100%"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=${
                plan.destinationCoords[0] - 0.5
              }%2C${plan.destinationCoords[1] - 0.5}%2C${
      plan.destinationCoords[0] + 0.5
    }%2C${plan.destinationCoords[1] + 0.5}&layer=mapnik"
              style="border: 0"
            ></iframe>
          </div>
        </div>
        <div class="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg z-10">
          <h4 class="font-bold text-gray-900 mb-2">Map Legend</h4>
          <div class="space-y-1 text-sm">
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 rounded-full bg-green-500"></div>
              <span>Start: ${plan.origin}</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 rounded-full bg-red-500"></div>
              <span>End: ${plan.destination}</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 rounded-full bg-blue-500"></div>
              <span>Day 1 Locations</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 rounded-full bg-purple-500"></div>
              <span>Day 2 Locations</span>
            </div>
          </div>
        </div>
        <div class="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg z-10">
          <div class="space-y-2 text-xs">
            ${plan.itinerary
              .map(
                (day) =>
                  `<div class="font-semibold ${
                    day.day === 1 ? "text-blue-600" : "text-purple-600"
                  }">Day ${day.day}: ${day.locations.length} locations</div>`
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
  }, [plan]);

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden">
      <div ref={mapContainer} className="w-full h-full"></div>
    </div>
  );
}
