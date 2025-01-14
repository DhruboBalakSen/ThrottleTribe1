import { NextRequest, NextResponse } from "next/server";
import { createPost } from "@/lib/queries";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const userId = formData.get("userId") as string;
    const content = formData.get("content") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const post = { userid: userId, content: content, imageUrl: imageUrl };
    const result = createPost(post)
    console.log(result)
    return NextResponse.json({message:"Post Created"},{status:200})
  } catch (error) {
    console.error("Unable to post: ", error);
    return NextResponse.json(
      { error: "Unable to create post" },
      { status: 500 }
    );
  }
}


