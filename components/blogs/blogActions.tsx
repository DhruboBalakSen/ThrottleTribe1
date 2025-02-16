"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Heart, MessageCircle, SendHorizonal } from "lucide-react";
import { Input } from "../ui/input";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import BlogLike from "./blogLike";

const BlogActions = ({id}: {id:number}) => {
  const router = useRouter();
  const [commenting, setCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState("")
  const {user} = useUser()
  const userId = user?.username

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/blog/comment?blogId=${id}`);
      const comments = res.data.comments;
      setCommentCount(comments.length);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  const handleComment = async () =>{
    try { 
      const res = await axios.post('/api/blog/comment',{id,userId,commentText:comment})
      if(res.status === 200){
        toast.success("Comment posted successfully")
        setComment("")
        router.refresh();
      }
    } catch (error) {
      
    }
  }


  return (
    <div className="flex items-center justify-between gap-6 pt-6 border-t">
      <Toaster position="top-right" />
      <div className="flex items-center gap-4">
        
        <BlogLike id={id} userId={userId as string} />
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={() => setCommenting(!commenting)}
        >
          <MessageCircle className="h-4 w-4" />

          {commentCount}
        </Button>
      </div>
      {commenting && (
        <div className="w-full flex gap-4">
          <Input className="" value={comment} onChange={(e) => setComment(e.target.value)}/>
          <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleComment}><SendHorizonal /></Button>
        </div>
      )}
    </div>
  );
};

export default BlogActions;
