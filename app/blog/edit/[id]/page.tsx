import { BlogEdit } from "@/components/blogs/blogEdit";
import { Header } from "@/components/main/header";
import { getBlog } from "@/lib/queries";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = (await params); // ensure it's a number if required by getBlog
  const blog = await getBlog(Number(id));

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {blog ? (
            <BlogEdit
              id={blog.id}
              title={blog.title}
              content={blog.content}
              tags={blog.tags}
            />
          ) : (
            <p className="text-center text-gray-500">Blog not found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
