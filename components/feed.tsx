import { Image, MessageCircle, Share2, Bookmark } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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

      {[1, 2].map((post) => (
        <Card key={post} className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img
                  src="default_pfp.jpg"
                  alt="Profile"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-medium">Pankaj Reet Tech</p>
                  <p className="text-sm text-muted-foreground">@pankajreet</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">⋮</Button>
            </div>
            <p className="mb-4">
              Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac
              cursus nisi luctus diam dignissim. Cras tincidunt etiam morbi egestas...
              <Button variant="link" className="px-0">Read More</Button>
            </p>
            <img
              src="/placeholder.svg?height=300&width=600"
              alt="Post"
              className="w-full rounded-lg mb-4"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="gap-2">
                  ❤️ 10,212
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  238
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  127
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

