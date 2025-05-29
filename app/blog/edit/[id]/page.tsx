import { BlogEdit } from "@/components/blogs/blogEdit";
import { Header } from "@/components/main/header"
import { getBlog, getUserDetails } from "@/lib/queries"


export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const {id}= await params
  const blog = await getBlog(id)
  const user = await getUserDetails(blog?.author as string);

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-5xl mx-auto">
          {blog && <BlogEdit id={blog.id} title={blog.title} content={blog.content} tags={blog.tags} />}
        </div>
      </main>
    </div>
  )
}

