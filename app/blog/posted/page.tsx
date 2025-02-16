import Link from "next/link"
import { Header } from "@/components/main/header"
import { Button } from "@/components/ui/button"

export default function BlogPostedPage() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-10 text-center h-[85vh] flex items-center justify-center">
        <div>
            <h1 className="text-3xl font-bold mb-4">Blog Post Published!</h1>
        <p className="mb-6">
          Your blog post has been successfully published. Thank you for sharing your travel experience!
        </p>
        <div className="space-x-4">
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link href="/blog">View All Blogs</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
        </div>
        
      </main>
    </div>
  )
}

