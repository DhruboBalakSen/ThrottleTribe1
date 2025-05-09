import { createTrip } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
      const body = await req.json()
      const payload ={
        title: body.title,
        start: body.startDate,
        end: body.endDate,
        cost: body.price,
        slots: Number(body.slots),
        contact: body.contact,
        location: body.location,
        tags: body.tags,
        userId: body.userId,
        itinerary: body.description
      }
      const trip = await createTrip(payload);
      return NextResponse.json({success:true});
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