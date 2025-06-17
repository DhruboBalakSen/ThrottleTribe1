"use client";
// export const dynamic = "force-dynamic"; // 🔥 Add this at the top of the file

import BlogCard from "@/components/blogs/blogCard";
import { Header } from "@/components/main/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react"; // ✅ This forces server-side rendering on every request

const Page = () => {
  // const blogs = await getBlogs();
  const [blogs, setBlogs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog/fetch");
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const [search, setSearch] = React.useState("");

  // Filter blogs by tags based on search input
  const filteredBlogs = blogs.filter((blog) => {
    if (!search.trim()) return true;
    if (!blog.tags || !Array.isArray(blog.tags)) return false;
    return blog.tags.some((tag: string) =>
      tag.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-6 h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Travel Blog</h1>
          <div className="flex gap-2">
            <div className="mb-6 flex justify-end">
              <Input
                type="text"
                placeholder="Search by tag..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <Button asChild className="bg-orange-500 hover:bg-orange-600">
              <Link href="/blog/create">Create New Post</Link>
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="p-6 h-[700px] flex items-center justify-center">
            <p className="text-gray-500 text-center text-lg">Loading...</p>
          </div>
        ) : filteredBlogs && filteredBlogs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                author={blog.author}
                content={blog.content}
                createdAt={blog.createdAt}
              />
            ))}
          </div>
        ) : (
          <div className="p-6 h-[700px] flex items-center justify-center">
            <p className="text-gray-500 text-center text-lg">No Blogs yet.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
