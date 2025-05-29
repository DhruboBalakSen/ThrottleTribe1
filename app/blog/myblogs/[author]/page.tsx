import BlogCard from "@/components/blogs/blogCard";
import { Header } from "@/components/main/header";
import { Button } from "@/components/ui/button";
import { getBlogByAuthor } from "@/lib/queries";
import Link from "next/link";
import React from "react";

const Page = async ({ params }: { params: Promise<{ author: string }> }) => {
  const {author} = await params;
  const blogs = await getBlogByAuthor(author);
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-6 h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Blog</h1>
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link href="/blog/create">Create New Post</Link>
          </Button>
        </div>
        
          {blogs && (blogs?.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                author={blog.author}
                content={blog.content}
                createdAt={blog.createdAt}
              />
            ))}
          </div>) : (
            <div className="p-6 h-[700]  flex items-center justify-center">
              <p className="text-gray-500 text-center text-lg">No Blogs yet.</p>
            </div>
          ))}
      </main>
    </div>
  );
};

export default Page;
