"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Divide, Heart } from "lucide-react";
import axios from "axios";

interface Props {
  id: number;
  userId: string;
}

function PostLike({ id, userId }: Props) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    fetchLikes();
  }, [liked]);
  useEffect(() => {
    fetchLikes();
  }, []);

  const fetchLikes = async () => {
    const likesResponse = await axios.get(`/api/post/like?postId=${id}`);
    const likes = likesResponse.data.likes;
    setLikes(likes);
    console.log(likes)
  };

  const handleLike = async () => {
    try {
      const res = await axios.post("/api/post/like", {
        postId: id,
        userId: userId,
      });
      if (res.status === 200) {
        setLiked(!liked);
      }
    } catch (error) {
      console.log("Error liking post:", error);
    }
  };
  return (
    <Button variant="ghost" size="sm" className="gap-2" onClick={handleLike}>
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
