import { createBlogComment, getBlogComments } from "@/lib/queries";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { id,userId,commentText } = await request.json();
        console.log(id,userId,commentText)
        const res = await createBlogComment(id,userId,commentText)
        return NextResponse.json({message:"Created Blog"},{status:200})
    } catch (error) {
        return NextResponse.json(
            { error: "Unable to create Blog" },
            { status: 500 }
          );
    }
}

export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const blogId = Number(searchParams.get("blogId"));
      console.log(blogId)
      const comments = await getBlogComments(blogId);
      return NextResponse.json({ comments }, { status: 200 });
    } catch (error) {}
  }