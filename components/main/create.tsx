"use client";

import { Image, SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export default function Create() {
  const {user} = useUser()
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [content, setContent] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContent = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const newValue = String(e.target.value)
    setContent(newValue)
  }

  const createPost = async () =>{
    const formData = new FormData();
    formData.append("userId",user?.username || "")
    formData.append("content", content);
    formData.append("imageUrl", newUrl);
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Posted successfully!");
        return;
      } else {
        throw new Error(data.error || "Post failed");
      }
    } catch (error) {
      console.log("Post failed");
      return null;
    }
  }

  const handleFileInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      await handleFiles(files);
    }
  };

  const handleFiles = async (files: File[]) => {
    setIsUploading(true);
    const uploadedUrls = await Promise.all(
      files.map((file) => uploadToServer(file))
    );
    const newUrls = uploadedUrls.filter((url): url is string => url !== null);
    setUploadedFiles((prev) => [...prev, ...newUrls]);
    setIsUploading(false);
    if (newUrls.length > 0) {
      toast.success(`Image ready to post`);
    }
  };

  const uploadToServer = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Upload successful! ");
        setNewUrl(data.url);
        return data.url;
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.log("Upload failed");
      return null;
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex gap-2">
          <img
            src={user?.imageUrl || "default_pfp.jpg"}
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
          <input
            type="text"
            placeholder="Share your experiences..."
            className="flex-1 bg-gray-100 rounded-full px-4"
            onChange = {handleContent}
          />
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleClick}>
              <Toaster position="top-right" />
              <Image className="h-5 w-5" />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInput}
                className="hidden"
                multiple
              />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" disabled={isUploading} onClick={createPost}>
              <SendHorizonal className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          {uploadedFiles.map((url, index) => {
            return (
              <div key={index} className="relative">
                <div className="mt-4 w-auto h-auto bg-gray-100 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center relative group">
                    <img
                      src={url}
                      alt={`File ${index + 1}`}
                      className="object-contain w-full h-full p-2"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
