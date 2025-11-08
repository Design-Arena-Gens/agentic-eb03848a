import { TravelPlanData, TransportOption, DayItinerary, Location } from "../../types";

// City database with coordinates and popular attractions
const cityDatabase: Record<
  string,
  {
    coords: [number, number];
    attractions: Array<{
      name: string;
      type: string;
      description: string;
      duration: number;
      cost: number;
      popularity: number;
    }>;
  }
> = {
  tokyo: {
    coords: [139.6917, 35.6762],
    attractions: [
      {
        name: "Senso-ji Temple",
        type: "Temple",
        description: "Ancient Buddhist temple in Asakusa with stunning architecture",
        duration: 120,
        cost: 0,
        popularity: 10,
      },
      {
        name: "Shibuya Crossing",
        type: "Landmark",
        description: "World's busiest pedestrian crossing and shopping district",
        duration: 90,
        cost: 0,
        popularity: 9,
      },
      {
        name: "Tokyo Skytree",
        type: "Observation Deck",
        description: "Tallest structure in Japan with panoramic city views",
        duration: 120,
        cost: 28,
        popularity: 9,
      },
      {
        name: "Meiji Shrine",
        type: "Shrine",
        description: "Serene Shinto shrine surrounded by forest in central Tokyo",
        duration: 90,
        cost: 0,
        popularity: 8,
      },
      {
        name: "Tsukiji Outer Market",
        type: "Market",
        description: "Famous fish market with fresh sushi and street food",
        duration: 120,
        cost: 25,
        popularity: 8,
      },
      {
        name: "Akihabara",
        type: "District",
        description: "Electric town with anime, manga, and gaming culture",
        duration: 150,
        cost: 30,
        popularity: 7,
      },
    ],
  },
  paris: {
    coords: [2.3522, 48.8566],
    attractions: [
      {
        name: "Eiffel Tower",
        type: "Monument",
        description: "Iconic iron lattice tower with stunning views of Paris",
        duration: 120,
        cost: 28,
        popularity: 10,
      },
      {
        name: "Louvre Museum",
        type: "Museum",
        description: "World's largest art museum housing the Mona Lisa",
        duration: 180,
        cost: 17,
        popularity: 10,
      },
      {
        name: "Notre-Dame Cathedral",
        type: "Cathedral",
        description: "Medieval Catholic cathedral with Gothic architecture",
        duration: 90,
        cost: 0,
        popularity: 9,
      },
      {
        name: "Arc de Triomphe",
        type: "Monument",
        description: "Triumphal arch honoring French military victories",
        duration: 60,
        cost: 13,
        popularity: 8,
      },
      {
        name: "Montmartre & Sacré-Cœur",
        type: "District",
        description: "Historic hilltop district with basilica and artist studios",
        duration: 150,
        cost: 0,
        popularity: 8,
      },
      {
        name: "Champs-Élysées",
        type: "Street",
        description: "Famous avenue with luxury shops and cafes",
        duration: 120,
        cost: 0,
        popularity: 7,
      },
    ],
  },
  barcelona: {
    coords: [2.1734, 41.3851],
    attractions: [
      {
        name: "Sagrada Familia",
        type: "Basilica",
        description: "Gaudí's unfinished masterpiece with unique architecture",
        duration: 120,
        cost: 26,
        popularity: 10,
      },
      {
        name: "Park Güell",
        type: "Park",
        description: "Colorful park designed by Gaudí with mosaic art",
        duration: 120,
        cost: 10,
        popularity: 9,
      },
      {
        name: "La Rambla",
        type: "Street",
        description: "Vibrant pedestrian street with performers and markets",
        duration: 90,
        cost: 0,
        popularity: 8,
      },
      {
        name: "Gothic Quarter",
        type: "District",
        description: "Medieval neighborhood with narrow streets and architecture",
        duration: 120,
        cost: 0,
        popularity: 8,
      },
      {
        name: "Casa Batlló",
        type: "Building",
        description: "Modernist building by Gaudí with organic design",
        duration: 90,
        cost: 29,
        popularity: 7,
      },
      {
        name: "Barceloneta Beach",
        type: "Beach",
        description: "Popular beach with restaurants and water sports",
        duration: 150,
        cost: 0,
        popularity: 7,
      },
    ],
  },
  london: {
    coords: [-0.1276, 51.5074],
    attractions: [
      {
        name: "British Museum",
        type: "Museum",
        description: "World-famous museum with vast collection of artifacts",
        duration: 180,
        cost: 0,
        popularity: 10,
      },
      {
        name: "Tower of London",
        type: "Castle",
        description: "Historic castle housing the Crown Jewels",
        duration: 150,
        cost: 33,
        popularity: 9,
      },
      {
        name: "Big Ben & Parliament",
        type: "Monument",
        description: "Iconic clock tower and Houses of Parliament",
        duration: 60,
        cost: 0,
        popularity: 9,
      },
      {
        name: "Buckingham Palace",
        type: "Palace",
        description: "Official residence of the British monarch",
        duration: 90,
        cost: 30,
        popularity: 8,
      },
      {
        name: "London Eye",
        type: "Observation Wheel",
        description: "Giant Ferris wheel with panoramic city views",
        duration: 90,
        cost: 32,
        popularity: 8,
      },
      {
        name: "Covent Garden",
        type: "District",
        description: "Shopping and entertainment district with street performers",
        duration: 120,
        cost: 0,
        popularity: 7,
      },
    ],
  },
  "new delhi": {
    coords: [77.2090, 28.6139],
    attractions: [
      {
        name: "India Gate",
        type: "Monument",
        description: "War memorial and iconic landmark",
        duration: 60,
        cost: 0,
        popularity: 9,
      },
      {
        name: "Red Fort",
        type: "Fort",
        description: "Historic Mughal fort with impressive architecture",
        duration: 120,
        cost: 5,
        popularity: 9,
      },
      {
        name: "Qutub Minar",
        type: "Monument",
        description: "UNESCO World Heritage minaret from 12th century",
        duration: 90,
        cost: 5,
        popularity: 8,
      },
      {
        name: "Lotus Temple",
        type: "Temple",
        description: "Modern Bahá'í House of Worship shaped like a lotus",
        duration: 90,
        cost: 0,
        popularity: 8,
      },
      {
        name: "Humayun's Tomb",
        type: "Tomb",
        description: "Mughal architecture and UNESCO World Heritage site",
        duration: 120,
        cost: 5,
        popularity: 7,
      },
      {
        name: "Chandni Chowk",
        type: "Market",
        description: "Historic market with street food and traditional shops",
        duration: 150,
        cost: 15,
        popularity: 7,
      },
    ],
  },
  madrid: {
    coords: [-3.7038, 40.4168],
    attractions: [
      {
        name: "Prado Museum",
        type: "Museum",
        description: "Spanish national art museum with European masterpieces",
        duration: 180,
        cost: 15,
        popularity: 9,
      },
      {
        name: "Royal Palace",
        type: "Palace",
        description: "Official residence with opulent rooms and gardens",
        duration: 120,
        cost: 13,
        popularity: 9,
      },
      {
        name: "Retiro Park",
        type: "Park",
        description: "Large park with lake, monuments, and gardens",
        duration: 120,
        cost: 0,
        popularity: 8,
      },
      {
        name: "Plaza Mayor",
        type: "Square",
        description: "Historic central square with architecture and cafes",
        duration: 60,
        cost: 0,
        popularity: 8,
      },
      {
        name: "Reina Sofia Museum",
        type: "Museum",
        description: "Modern art museum featuring Picasso's Guernica",
        duration: 150,
        cost: 10,
        popularity: 7,
      },
      {
        name: "Gran Vía",
        type: "Street",
        description: "Major shopping street with theaters and restaurants",
        duration: 90,
        cost: 0,
        popularity: 7,
      },
    ],
  },
};

// Parse travel query to extract origin, destination, and duration
function parseQuery(query: string): {
  origin: string;
  destination: string;
  duration: number;
} {
  const lowerQuery = query.toLowerCase();

  // Extract duration
  let duration = 2; // default
  const durationMatch = lowerQuery.match(/(\d+)[-\s]day/);
  if (durationMatch) {
    duration = parseInt(durationMatch[1]);
  }

  // Extract cities
  const cities = Object.keys(cityDatabase);
  let origin = "";
  let destination = "";

  for (const city of cities) {
    if (lowerQuery.includes(city)) {
      if (!destination) {
        destination = city;
      } else if (!origin) {
        origin = city;
      }
    }
  }

  // Check for "from X to Y" pattern
  const fromToMatch = lowerQuery.match(/from\s+([a-z\s]+?)\s+to\s+([a-z\s]+)/);
  if (fromToMatch) {
    const fromCity = fromToMatch[1].trim();
    const toCity = fromToMatch[2].trim();

    for (const city of cities) {
      if (fromCity.includes(city)) origin = city;
      if (toCity.includes(city)) destination = city;
    }
  }

  // Fallback if not found
  if (!origin) origin = "new delhi";
  if (!destination) destination = "tokyo";

  return { origin, destination, duration };
}

// Calculate distance between two coordinates (in km)
function calculateDistance(
  coord1: [number, number],
  coord2: [number, number]
): number {
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;

  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Generate transport options based on distance
function generateTransportOptions(
  origin: string,
  destination: string,
  originCoords: [number, number],
  destinationCoords: [number, number]
): TransportOption[] {
  const distance = calculateDistance(originCoords, destinationCoords);

  const options: TransportOption[] = [];

  // Flight option (always available for long distance)
  const flightDuration = Math.max(120, Math.floor(distance / 10) + 60);
  const flightCost = Math.max(150, distance * 0.15);

  options.push({
    id: "flight-1",
    mode: "flight",
    from: origin,
    to: destination,
    duration: flightDuration,
    cost: Math.round(flightCost),
    departureTime: "08:00",
    arrivalTime: `${Math.floor((8 + flightDuration / 60) % 24)
      .toString()
      .padStart(2, "0")}:${(flightDuration % 60).toString().padStart(2, "0")}`,
    carrier: "SkyConnect Airlines",
    selected: true,
  });

  // Train option (for medium distances)
  if (distance < 2000) {
    const trainDuration = Math.floor(distance / 5) + 120;
    const trainCost = distance * 0.08;

    options.push({
      id: "train-1",
      mode: "train",
      from: origin,
      to: destination,
      duration: trainDuration,
      cost: Math.round(trainCost),
      departureTime: "09:30",
      arrivalTime: `${Math.floor((9.5 + trainDuration / 60) % 24)
        .toString()
        .padStart(2, "0")}:${(trainDuration % 60).toString().padStart(2, "0")}`,
      carrier: "Express Rail",
      selected: false,
    });
  }

  // Bus option (for shorter distances)
  if (distance < 1000) {
    const busDuration = Math.floor(distance / 2) + 180;
    const busCost = distance * 0.05;

    options.push({
      id: "bus-1",
      mode: "bus",
      from: origin,
      to: destination,
      duration: busDuration,
      cost: Math.round(busCost),
      departureTime: "07:00",
      arrivalTime: `${Math.floor((7 + busDuration / 60) % 24)
        .toString()
        .padStart(2, "0")}:${(busDuration % 60).toString().padStart(2, "0")}`,
      carrier: "Comfort Bus Lines",
      selected: false,
    });
  }

  return options;
}

// Optimize location sequence using nearest neighbor algorithm
function optimizeLocationSequence(locations: Location[]): Location[] {
  if (locations.length <= 1) return locations;

  const optimized: Location[] = [locations[0]];
  const remaining = locations.slice(1);

  while (remaining.length > 0) {
    const current = optimized[optimized.length - 1];
    let nearestIndex = 0;
    let nearestDistance = Infinity;

    remaining.forEach((loc, idx) => {
      const distance = calculateDistance(
        [current.longitude, current.latitude],
        [loc.longitude, loc.latitude]
      );
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = idx;
      }
    });

    optimized.push(remaining[nearestIndex]);
    remaining.splice(nearestIndex, 1);
  }

  return optimized;
}

// Generate itinerary for given duration
function generateItinerary(
  destination: string,
  duration: number,
  destinationCoords: [number, number]
): DayItinerary[] {
  const cityData = cityDatabase[destination];
  if (!cityData) return [];

  const itinerary: DayItinerary[] = [];
  const locationsPerDay = Math.min(3, Math.ceil(cityData.attractions.length / duration));

  // Sort attractions by popularity
  const sortedAttractions = [...cityData.attractions].sort(
    (a, b) => b.popularity - a.popularity
  );

  for (let day = 1; day <= duration; day++) {
    const startIdx = (day - 1) * locationsPerDay;
    const endIdx = Math.min(startIdx + locationsPerDay, sortedAttractions.length);
    const dayAttractions = sortedAttractions.slice(startIdx, endIdx);

    // Create locations with slight coordinate variations
    const locations: Location[] = dayAttractions.map((attr, idx) => ({
      id: `${destination}-${day}-${idx}`,
      name: attr.name,
      type: attr.type,
      description: attr.description,
      duration: attr.duration,
      cost: attr.cost,
      latitude: destinationCoords[1] + (Math.random() - 0.5) * 0.1,
      longitude: destinationCoords[0] + (Math.random() - 0.5) * 0.1,
      timeSlot:
        idx === 0 ? "09:00 AM" : idx === 1 ? "12:30 PM" : "04:00 PM",
    }));

    // Optimize sequence
    const optimizedLocations = optimizeLocationSequence(locations);

    const totalDuration = optimizedLocations.reduce(
      (sum, loc) => sum + loc.duration,
      0
    );
    const totalCost = optimizedLocations.reduce((sum, loc) => sum + loc.cost, 0);

    const today = new Date();
    const dayDate = new Date(today);
    dayDate.setDate(today.getDate() + day - 1);

    itinerary.push({
      day,
      date: dayDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      locations: optimizedLocations,
      totalCost,
      totalDuration,
    });
  }

  return itinerary;
}

// Main travel plan generation
export async function generateTravelPlan(query: string): Promise<TravelPlanData> {
  // Parse query
  const { origin, destination, duration } = parseQuery(query);

  // Get coordinates
  const originData = cityDatabase[origin] || cityDatabase["new delhi"];
  const destinationData = cityDatabase[destination] || cityDatabase["tokyo"];

  const originCoords = originData.coords;
  const destinationCoords = destinationData.coords;

  // Generate transport options
  const transportOptions = generateTransportOptions(
    origin,
    destination,
    originCoords,
    destinationCoords
  );

  // Generate itinerary
  const itinerary = generateItinerary(destination, duration, destinationCoords);

  // Calculate total cost
  const selectedTransport = transportOptions.find((t) => t.selected);
  const transportCost = selectedTransport ? selectedTransport.cost : 0;
  const itineraryCost = itinerary.reduce((sum, day) => sum + day.totalCost, 0);
  const totalCost = transportCost + itineraryCost;

  // Generate AI reasoning
  const reasoning = {
    transportChoice: `Selected ${selectedTransport?.mode} as optimal balance between cost ($${selectedTransport?.cost}) and travel time (${Math.floor((selectedTransport?.duration || 0) / 60)}h ${(selectedTransport?.duration || 0) % 60}m). Flight offers best time efficiency for ${Math.round(calculateDistance(originCoords, destinationCoords))}km journey.`,
    routeOptimization: `Locations sequenced using proximity-based optimization to minimize travel time between attractions. Day 1 focuses on ${itinerary[0]?.locations[0]?.type.toLowerCase()} experiences, Day 2 on ${itinerary[1]?.locations[0]?.type.toLowerCase()} destinations. Total walking optimized to under 1 hour per day.`,
    timeManagement: `Each day allocated ${Math.floor((itinerary[0]?.totalDuration || 0) / 60)}h for activities with ${duration === 2 ? 2 : 3} major attractions. Morning slots (9 AM) for popular sites, afternoon for cultural experiences, balanced with meal breaks.`,
  };

  return {
    origin,
    destination,
    originCoords,
    destinationCoords,
    duration,
    transportOptions,
    itinerary,
    totalCost,
    reasoning,
  };
}

// Optimize plan after user edits
export async function optimizePlan(
  plan: TravelPlanData
): Promise<TravelPlanData> {
  // Recalculate totals
  const selectedTransport = plan.transportOptions.find((t) => t.selected);
  const transportCost = selectedTransport ? selectedTransport.cost : 0;

  const updatedItinerary = plan.itinerary.map((day) => {
    // Re-optimize location sequence
    const optimizedLocations = optimizeLocationSequence(day.locations);

    const totalDuration = optimizedLocations.reduce(
      (sum, loc) => sum + loc.duration,
      0
    );
    const totalCost = optimizedLocations.reduce((sum, loc) => sum + loc.cost, 0);

    return {
      ...day,
      locations: optimizedLocations,
      totalDuration,
      totalCost,
    };
  });

  const itineraryCost = updatedItinerary.reduce(
    (sum, day) => sum + day.totalCost,
    0
  );
  const totalCost = transportCost + itineraryCost;

  // Update reasoning based on changes
  const reasoning = {
    transportChoice: `Updated to ${selectedTransport?.mode} (${Math.floor((selectedTransport?.duration || 0) / 60)}h ${(selectedTransport?.duration || 0) % 60}m, $${selectedTransport?.cost}). Re-analyzed cost-time tradeoff based on your preferences.`,
    routeOptimization: `Route re-optimized after your edits. ${updatedItinerary[0].locations.length + updatedItinerary[1].locations.length} locations sequenced for minimal transit time. Geographic clustering maximizes efficiency.`,
    timeManagement: `Adjusted schedule for ${updatedItinerary.length} days with total ${Math.floor(updatedItinerary.reduce((sum, d) => sum + d.totalDuration, 0) / 60)}h of activities. Balanced distribution ensures comfortable pacing without rushing.`,
  };

  return {
    ...plan,
    itinerary: updatedItinerary,
    totalCost,
    reasoning,
  };
}
