import { Header } from "@/components/header"
import { LeftSidebar } from "@/components/left-sidebar"
import { RightSidebar } from "@/components/right-sidebar"
import { Feed } from "@/components/feed"

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <LeftSidebar />
          <Feed />
          <RightSidebar />
        </div>
      </main>
    </div>
  )
}

