import { getBlogLikes, toggleBlogLike } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { blogId, userId } = await request.json();
    // console.log(blogId, userId)
    const result = await toggleBlogLike(blogId,userId)
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
        const blogId = Number(searchParams.get('blogId'));
        // console.log(blogId)
        const likes = await getBlogLikes(blogId);
        // console.log(likes)
        return NextResponse.json({likes},{ status: 200 });
    } catch (error) {
        console.error("Error getting like count:", error);
        return NextResponse.json(
        { error: "Unable to get like count" },
        { status: 500 }
        );
    }
}