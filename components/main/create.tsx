"use client";

import { SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Upload from "./upload";

export default function Create() {
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex gap-2">
          <img
            src="default_pfp.jpg"
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
          <input
            type="text"
            placeholder="Share your experiences..."
            className="flex-1 bg-gray-100 rounded-full px-4"
          />
          <div className="flex gap-2">
            <Upload />
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <SendHorizonal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
