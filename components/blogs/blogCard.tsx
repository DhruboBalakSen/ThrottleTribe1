"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useState } from "react";
import axios from "axios";

interface Blog {
  id: number;
  title: string;
  author: string;
  content: string;
  createdAt: Date;
}
function BlogCard({ id, title, author, content, createdAt }: Blog) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post(`/api/user`, { username: author });
        setUser(res.data);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, [author]);
  return (
    <Card className="shadow-lg rounded-xl overflow-hidden border border-gray-200 transition-transform hover:scale-[1.02] hover:shadow-xl">
      <CardHeader className="p-5">
        <CardTitle className="text-xl font-semibold text-gray-900">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mt-1">
          {user?.name} •{" "}
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          • {Math.ceil(content.trim().split(/\s+/).length / 200) + " min read"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 border-t">
        <p className="text-gray-700">{content.slice(0, 100)}...</p>
        <Button
          asChild
          variant="outline"
          className="mt-4 w-full text-sm font-medium"
        >
          <Link
            href={`/blog/${id}`}
            className="text-orange-600 hover:text-orange-700"
          >
            Read More →
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default BlogCard;
