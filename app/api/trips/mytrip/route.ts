import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
      const bookedTrips = await prisma.bookedTrips.findMany();
        const trips = bookedTrips.filter((trip) => trip.userId == userId)
        return NextResponse.json({ success: true, trips }, { status: 200 });

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