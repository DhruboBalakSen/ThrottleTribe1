import { Header } from "@/components/main/header"
import { BlogPostForm } from "@/components/blogs/blogPostForm"

export default function CreateBlogPage() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Create a New Blog Post</h1>
        <BlogPostForm />
      </main>
    </div>
  )
}

