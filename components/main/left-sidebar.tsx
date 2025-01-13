import { Heart, Users, Grid, Image, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'

export async function  LeftSidebar() {
  const user = await currentUser();
  // console.log(user)
  return (
    <div className="hidden lg:flex flex-col gap-6 w-64">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <img
              src={user?.imageUrl || "default_pfp.jpg"}
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-medium">{user?.fullName}</p>
              <p className="text-sm text-muted-foreground">@{user?.username}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <nav className="space-y-1">
            <Link href ={`/profile/${user?.username}`}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Heart className="h-5 w-5 text-orange-500" />
              My Profile
            </Button>
            </Link>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex justify-between items-center">
            People you may know
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-4">
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
        </CardContent>
      </Card>

    </div>
  )
}

