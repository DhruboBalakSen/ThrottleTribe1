import { NextRequest, NextResponse } from "next/server";
import { updateBio } from "@/lib/queries";

export async function POST(request: NextRequest) {
  try {
    const { username, bio } = await request.json();
    const result = updateBio(username,bio)
    console.log(result)
    return NextResponse.json({message:"Bio Updated"},{status:200})
  } catch (error) {
    console.error("Unable to create post: ", error);
    return NextResponse.json(
      { error: "Unable to update bio" },
      { status: 500 }
    );
  }
}