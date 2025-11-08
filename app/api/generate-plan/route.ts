import { NextRequest, NextResponse } from "next/server";
import { generateTravelPlan } from "../agent/travelAgent";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    const plan = await generateTravelPlan(query);
    return NextResponse.json(plan);
  } catch (error) {
    console.error("Error generating plan:", error);
    return NextResponse.json(
      { error: "Failed to generate travel plan" },
      { status: 500 }
    );
  }
}
