import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
      const{ userId, tripId } = await req.json();
      console.log("Received data:", { userId, tripId });
      await prisma.bookedTrips.create({
          data: {
                userId,
                tripId,
            },
        });
      return NextResponse.json({ success: true, message: "Trip booked successfully" }, { status: 200 });
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