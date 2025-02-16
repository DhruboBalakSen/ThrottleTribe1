import { Header } from "@/components/main/header"
import Blog from "@/components/blogs/blog"


export default async function Page({ params }: { params: { id: string } }) {
  const id = (await params).id

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-5xl mx-auto">
          <Blog id={id}/>
        </div>
      </main>
    </div>
  )
}

