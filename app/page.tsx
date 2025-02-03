import { Header } from "@/components/main/header"
import { LeftSidebar } from "@/components/main/left-sidebar"
import { RightSidebar } from "@/components/main/right-sidebar"
import { Feed } from "@/components/main/feed"

export default async function Home() {

  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-2">
          <LeftSidebar />
          <Feed />
          <RightSidebar />
        </div>
      </main>
    </div>
  )
}

