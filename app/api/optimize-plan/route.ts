import { NextRequest, NextResponse } from "next/server";
import { optimizePlan } from "../agent/travelAgent";

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json();

    if (!plan) {
      return NextResponse.json(
        { error: "Plan is required" },
        { status: 400 }
      );
    }

    const optimizedPlan = await optimizePlan(plan);
    return NextResponse.json(optimizedPlan);
  } catch (error) {
    console.error("Error optimizing plan:", error);
    return NextResponse.json(
      { error: "Failed to optimize travel plan" },
      { status: 500 }
    );
  }
}
