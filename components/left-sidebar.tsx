import { Heart, Users, Grid, Image } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function LeftSidebar() {
  return (
    <div className="hidden lg:flex flex-col gap-6 w-64">
      <div className="flex items-center gap-2 p-2">
        <img
          src="default_pfp.jpg"
          alt="Profile"
          className="h-10 w-10 rounded-full"
        />
        <div>
          <p className="font-medium">Samay Panchal</p>
          <p className="text-sm text-muted-foreground">@samaypanchal</p>
        </div>
      </div>

      <nav className="space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Heart className="h-5 w-5 text-orange-500" />
          Explore Feed
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Users className="h-5 w-5 text-orange-500" />
          Friend Requests
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Grid className="h-5 w-5 text-orange-500" />
          Groups
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Image className="h-5 w-5 text-orange-500" />
          Memories
        </Button>
      </nav>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">People you may know</h3>
          <Button variant="ghost" size="sm">→</Button>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <img
              src="default_pfp.jpg"
              alt="Suggestion"
              className="h-10 w-10 rounded-full"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">Samay Panchal</p>
              <p className="text-xs text-muted-foreground">@samaypanchal</p>
            </div>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">Follow</Button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Check out these deals</h3>
          <Button variant="ghost" size="sm">→</Button>
        </div>
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <img
                  src="/placeholder.svg?height=60&width=60"
                  alt="KTM"
                  className="h-15 w-15 rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium">KTM SH400</p>
                  <p className="text-sm text-muted-foreground">Rs. 82,307</p>
                  <Button size="sm" className="mt-2 bg-orange-500 hover:bg-orange-600">Details</Button>
                </div>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">24% Off</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

