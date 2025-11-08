export interface Location {
  id: string;
  name: string;
  type: string;
  description: string;
  duration: number; // in minutes
  cost: number; // in USD
  latitude: number;
  longitude: number;
  timeSlot: string;
}

export interface DayItinerary {
  day: number;
  date: string;
  locations: Location[];
  totalCost: number;
  totalDuration: number;
}

export interface TransportOption {
  id: string;
  mode: "flight" | "train" | "bus";
  from: string;
  to: string;
  duration: number; // in minutes
  cost: number; // in USD
  departureTime: string;
  arrivalTime: string;
  carrier: string;
  selected: boolean;
}

export interface TravelPlanData {
  origin: string;
  destination: string;
  originCoords: [number, number];
  destinationCoords: [number, number];
  duration: number; // number of days
  transportOptions: TransportOption[];
  itinerary: DayItinerary[];
  totalCost: number;
  reasoning: {
    transportChoice: string;
    routeOptimization: string;
    timeManagement: string;
  };
}
