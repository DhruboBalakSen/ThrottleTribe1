import { NextRequest, NextResponse } from "next/server";
import { createPost,deletePost, updatePost } from "@/lib/queries";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const userId = formData.get("userId") as string;
    const content = formData.get("content") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const post = { userid: userId, content: content, imageUrl: imageUrl };
    await createPost(post)
    return NextResponse.json({message:"Post Created"},{status:200})
  } catch (error) {
    console.error("Unable to create post: ", error);
    return NextResponse.json(
      { error: "Unable to create post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const idFromQuery = url.searchParams.get("id");
    let postId = idFromQuery ? Number(idFromQuery) : null;

    if (!postId) {
      const body = await request.json().catch(() => null);
      postId = body?.id ? Number(body.id) : null;
    }

    if (!postId || isNaN(postId)) {
      return NextResponse.json(
        { message: "Invalid or missing postId" },
        { status: 400 }
      );
    }

    await deletePost(postId);

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while deleting post:", error);

    return NextResponse.json(
      { error: "Unable to delete post" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, content } = await req.json();

    if (!id || !content) {
      return NextResponse.json({ error: "ID and content are required" }, { status: 400 });
    }

    const updatedPost = await updatePost(id, content);

    return NextResponse.json({message : "Updated Post"}, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



