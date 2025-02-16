"use client";
import { MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import PostLike from "./postLike";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster } from "react-hot-toast";

interface Props {
  id: number;
  userId: string;
}

function PostActions({ id, userId }: Props) {
  const router = useRouter();
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/post/comment?postId=${id}`);
      const comments = res.data.comments;
      setCommentCount(comments.length);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  const handleCommentClick = () => {
    router.push(`/post/${id}`);
  };

  return (
    <div className="flex items-center justify-between">
      <Toaster position="top-right" />

      <div className="flex items-center gap-4">
        <PostLike id={id} userId={userId} />
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={handleCommentClick}
        >
          <MessageCircle className="h-4 w-4" />
          {commentCount > 0 ? commentCount : 0}
        </Button>
      </div>
    </div>
  );
}

export default PostActions;
