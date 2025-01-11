"use client";

import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const Upload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <Button variant="ghost" size="icon" onClick={handleClick}>
      <Image className="h-5 w-5" />
      <input type="file" ref={fileInputRef} className="hidden" />
    </Button>
  );
};

export default Upload;
