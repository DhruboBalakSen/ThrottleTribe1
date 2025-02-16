import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getBlog, getUserDetails } from "@/lib/queries";
import Image from "next/image";
import { auth, currentUser } from "@clerk/nextjs/server";
import BlogOptions from "./blogOptions";
import BlogActions from "./blogActions";
import BlogComments from "./blogComments";
interface props {
  id: string;
}

const Blog = async ({ id }: props) => {
  const blog = await getBlog(Number(id));
  const user = await getUserDetails(blog?.author as string);
  await auth();
  const currentuser = await currentUser();
  return (
    <div>
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Link>
      </Button>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src={user?.profilePicture as string}
                alt="profile picture"
                height={40}
                width={40}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {blog?.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  •{" "}
                  {blog &&
                    Math.ceil(blog?.content.trim().split(/\s+/).length / 200) +
                      " Min read"}
                </p>
              </div>
            </div>
            {user?.username === currentuser?.username && (
              <BlogOptions id={blog?.id as number} />
            )}
          </div>
          <CardTitle className="text-3xl">{blog?.title}</CardTitle>
          <div className="flex flex-wrap gap-2">
            {blog?.tags.map((tag) => (
              <p
                key={tag}
                className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full hover:bg-orange-200 transition-colors"
              >
                #{tag}
              </p>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-lg max-w-none">
            {blog?.content.split("\n\n").map((paragraph, index) => {
              const startsWithNumber = /^\d+/.test(paragraph);

              return (
                <p key={index} className="mb-4">
                  {startsWithNumber ? (
                    <>
                      <strong>{paragraph}</strong>
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              );
            })}
          </div>
          {blog?.imageUrl && (
            <img
              src={blog?.imageUrl || "/placeholder.svg"}
              alt="Additional blog image"
              className="w-full rounded-lg object-cover aspect-video"
            />
          )}
          
              {/* <Button variant="ghost" size="sm" className="gap-2">
                <Heart className="h-4 w-4" />
                {blog?.likes}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                {post.comments}
              </Button> */}
              <BlogActions id={blog?.id as number} />
              <BlogComments id={blog?.id as number} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
