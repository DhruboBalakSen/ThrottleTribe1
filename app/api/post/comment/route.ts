import { createComment, deleteComment, getComments } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { postId, userId, commentText } = await request.json();
    const res = await createComment(postId, userId, commentText);
    return NextResponse.json({ message: "Comment Created" }, { status: 200 });
  } catch (error) {
    console.error("Unable to create comment: ", error);
    return NextResponse.json(
      { error: "Unable to create comment" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = Number(searchParams.get("postId"));
    const comments = await getComments(postId);
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {}
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("commentId");

  try {
    const comment = await deleteComment(Number(id));

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the comment" },
      { status: 500 }
    );
  }
}
