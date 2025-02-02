import prisma from "@/lib/db";
import { getLikeCount, toggleLike } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { postId, userId } = await request.json();
    const result = await toggleLike(postId,userId)
    return NextResponse.json({message:"Post liked"},{status:200})
  } catch (error) {
    console.error("Unable to create post: ", error);
    return NextResponse.json(
      { error: "Unable to create post" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const postId = Number(searchParams.get('postId'));
        const likes = await getLikeCount(postId);
        return NextResponse.json({ likes }, { status: 200 });
    } catch (error) {
        console.error("Error getting like count:", error);
        return NextResponse.json(
        { error: "Unable to get like count" },
        { status: 500 }
        );
    }
}