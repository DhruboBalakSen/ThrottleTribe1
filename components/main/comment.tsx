"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { ScrollArea } from "../ui/scroll-area";
import { MoreHorizontal, MoreVertical, SendHorizonal, X } from "lucide-react";
import { Input } from "../ui/input";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import CommentOptions from "./commentOptions";

interface CommentProps {
  id: number;
  userId: string;
  commentText: string;
}

interface CommentsProps {
  comments: CommentProps[];
  postId: number;
}

interface UserDetails {
  name: string;
  username: string;
  profilePicture: string;
}

export function Comments({ comments, postId }: CommentsProps) {
  const [userDetailsMap, setUserDetailsMap] = useState<
    Record<string, UserDetails>
  >({});
  const [commentText, setCommentText] = useState("");
  const router = useRouter();
  const { user } = useUser();
  const username = user?.username as string;

  useEffect(() => {
    const fetchUserDetails = async () => {
      const uniqueUserIds = Array.from(new Set(comments.map((c) => c.userId)));

      try {
        const userResponses = await Promise.all(
          uniqueUserIds.map(async (userId) => {
            const res = await axios.get(`/api/profile?userId=${userId}`);
            return { userId, data: res.data.user };
          })
        );

        const newUserDetailsMap: Record<string, UserDetails> = {};
        userResponses.forEach(({ userId, data }) => {
          newUserDetailsMap[userId] = data;
        });

        setUserDetailsMap(newUserDetailsMap);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [comments]);

  const handleCommentSubmit = async () => {
    try {
      const res = await axios.post("/api/post/comment", {
        postId: postId,
        userId: username,
        commentText: commentText,
      });
      if (res.status === 200) {
        toast.success("Comment posted successfully");
        router.refresh();
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
    setCommentText("");
  };

  return (
    <div className="min-w-80">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center">
        <h2 className="font-semibold mb-4">Comments</h2>
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <X />
        </Button>
      </div>
      {comments.length > 0 ? (
        <ScrollArea className="h-[23rem] w-[330px] rounded-md">
          {comments.map((comment) => {
            const user = userDetailsMap[comment.userId];

            return (
              <Card key={comment.id} className="mb-3 mr-3">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <img
                          src={user?.profilePicture || "/default_pfp.jpg"}
                          alt="Profile"
                          className="h-5 w-5 rounded-full"
                        />
                        <p className="font-medium text-sm">
                          {user?.name || "Loading..."}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          @{user?.username || ""}
                        </p>
                      </div>
                      <p className="text-sm mt-3">{comment.commentText}</p>
                    </div>
                    {comment.userId === username && (
                      <CommentOptions id={comment.id} />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </ScrollArea>
      ) : (
        <div className="h-[23rem] flex items-center justify-center border rounded-md text-gray-600">
          No Comments yet!!
        </div>
      )}
      <div className="flex items-center justify-center gap-2 mt-4">
        <Input
          placeholder="Write your comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="px-4"
        />
        <Button
          className="bg-orange-500 hover:bg-orange-600"
          onClick={handleCommentSubmit}
        >
          <SendHorizonal />
        </Button>
      </div>
    </div>
  );
}
