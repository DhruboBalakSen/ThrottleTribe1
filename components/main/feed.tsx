import { Image, MessageCircle, Share2, Bookmark } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Post } from './post'

const mockPosts = [
  {
    id: 1,
    author: {
      name: "Pankaj Reet Tech",
      username: "pankajreet",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    content: "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisi luctus diam dignissim. Cras tincidunt etiam morbi egestas...",
    image: "https://placehold.co/600x300",
    likes: 10212,
    comments: 238,
    shares: 127
  },
  {
    id: 2,
    author: {
      name: "Jane Doe",
      username: "janedoe",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    image: "https://placehold.co/600x300",
    likes: 8765,
    comments: 192,
    shares: 85
  }
]

export function Feed() {
  return (
    <div className="flex-1 max-w-2xl mx-auto">
      <div className="flex gap-2 overflow-x-auto py-4 px-2">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <img
              src="default_pfp.jpg"
              alt="Story"
              className="h-14 w-14 rounded-full ring-2 ring-orange-500 p-1"
            />
            <span className="text-xs">User {i}</span>
          </div>
        ))}
      </div>

      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <img
              src="default_pfp.jpg"
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
            <input
              type="text"
              placeholder="Share your experiences..."
              className="flex-1 bg-gray-100 rounded-full px-4"
            />
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Image className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">📍</Button>
              <Button variant="ghost" size="icon">💡</Button>
              <Button variant="ghost" size="icon">📊</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {mockPosts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  )
}



