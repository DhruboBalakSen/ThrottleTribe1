"use client";

import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      console.log(`${newUrls.length} file(s) uploaded successfully`);
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
      if (response) {
        // await storeFileUrl(data.url);
        console.log("Upload successful! ");
        // console.log(data.url);
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
    <Button variant="ghost" size="icon" onClick={handleClick}>
      <Image className="h-5 w-5" />
      <input type="file" ref={fileInputRef} onChange={handleFileInput} className="hidden" multiple/>
    </Button>
  );
};

export default Upload;
