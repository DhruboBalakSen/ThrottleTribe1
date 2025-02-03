import { NextRequest, NextResponse } from "next/server";
import { getUserDetails, updateBio } from "@/lib/queries";

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') as string;
    const user = await getUserDetails(userId)
    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    
  }
}