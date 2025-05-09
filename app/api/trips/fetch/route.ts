import { fetchTrips, getTripById } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
     const { id } = await req.json();
     if(id){
      const trip = await getTripById(Number(id));
      return NextResponse.json({success: true, trip})
     }

      const trips = await fetchTrips();
      return NextResponse.json({success: true, trips})
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching user:", error.message);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}