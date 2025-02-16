"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Label } from "../ui/label";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  content: z.string().min(50, {
    message: "Content must be at least 50 characters.",
  }),
  tags: z.string().optional(),
});
interface props {
  id: number;
  title: string;
  content: string;
  tags: string[];
}

export function BlogEdit({ id, title, content, tags }: props) {
  const router = useRouter();
  const [ImageUrl, setImageUrl] = useState("");
  const tag = tags.join(", ");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      content: content,
      tags: tag,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const title = values.title;
    const content = values.content;
    const imageUrl = ImageUrl === "" ? "" : ImageUrl;
    const tags = values.tags?.split(",").map((item) => item.trim()) || [""];

    try {
      const res = await axios.patch("/api/blog", {
        id: id,
        title: title,
        content: content,
        imageUrl: imageUrl,
        tags: tags,
      });
      if (res.status === 200) {
        router.push(`/blog/${id}`);
      } else {
        console.log("Failed to update Blog");
      }
    } catch (error) {
      router.push("/blog/posted");
    }
  }

  const handleFileInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      files.map((file) => uploadToServer(file));
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
        toast.success("Upload successful! ");
        setImageUrl(data.url);
        return data.url;
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.log("Upload failed");
      return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <Toaster position="top-right" />
      <CardHeader>
        <CardTitle>Create a New Blog Post</CardTitle>
        <CardDescription>
          Share your travel experiences with the community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your blog post title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog post here..."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid w-full max-w-sm items-center gap-2.5">
              <Label>Image</Label>
              <Input
                id="Image"
                type="file"
                accept="image/*"
                onChange={handleFileInput}
              />
              <p className="text-zinc-500 text-sm">
                Optional: Upload an image to update
              </p>
            </div>

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter tags separated by commas"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional: Add tags to help categorize your post.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Update Blog
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
