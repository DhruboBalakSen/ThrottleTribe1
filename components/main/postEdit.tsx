"use client";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface Post {
  id: number;
  content: string | null;
  imageUrl: string | null;
}

interface User {
  profilePicture: string | null;
  name: string;
  username: string;
}

function PostEdit({ post, user }: { post: Post; user: User}) {
  const [content, setContent] = useState(post?.content || "");
  const router = useRouter();
  const handleCancel = () => {
    setContent(post?.content || "");
    router.back();
  };
  const handleSave = async () => {
    try {
      const id = post.id;
      const res = await axios.patch("/api/post", { id: id, content: content });
      if (res.status === 200) {
        toast.success("Updated post Successfully");
        router.push("/");
      } else {
        toast.error("Failed to update Bio");
        handleCancel();
      }
    } catch (error) {}
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center backdrop-blur-md">
      <div className="flex items-center justify-center max-w-2xl mx-auto mt-24">
        <Card className="mb-4">
          <Toaster position="top-right" />
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img
                  src={user?.profilePicture || "default_pfp.jpg"}
                  alt="Profile"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    @{user?.username}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <X />
              </Button>
            </div>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mb-4 "
            />
            <img
              src={post?.imageUrl || "https://placehold.co/600x300"}
              alt="Post"
              className="w-full rounded-lg mb-4"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 gap-2"
                  size="default"
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  variant="ghost"
                  size="default"
                  className="gap-2"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PostEdit;
