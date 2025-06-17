"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import axios from "axios";

interface Props {
  id: number;
  userId: string;
}

function PostLike({ id, userId }: Props) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likesResponse = await axios.get(`/api/post/like?postId=${id}`);
        const likesData = likesResponse.data.likes || [];
        setLikes(likesData.length);
        setLiked(
          likesData.some((like: { userId: string }) => like.userId === userId)
        );
      } catch (error) {
        console.log("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [id, userId, liked]);

  const handleLike = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await axios.post("/api/post/like", {
        postId: id,
        userId: userId,
      });

      if (res.status === 200) {
        setLiked((prev) => !prev);
      }
    } catch (error) {
      console.log("Error liking post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2"
      onClick={handleLike}
      disabled={loading}
    >
      {liked ? (
        <div className="mx-[2px]">❤️</div>
      ) : (
        <div className="mx-[2px]">
          <Heart />
        </div>
      )}{" "}
      {likes > 0 ? likes : 0}
    </Button>
    
  );
}

export default PostLike;
