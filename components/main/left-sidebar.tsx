import { Heart, Bike, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { currentUser, auth } from "@clerk/nextjs/server";
import { getUsers } from "@/lib/queries";

export async function LeftSidebar() {
  await auth();
  const currentuser = await currentUser();
  const users = await getUsers();
  const filteredUsers = users.filter(
    (user) => user.username !== currentuser?.username
  );
  return (
    <div className="hidden lg:flex flex-col gap-4 w-96">
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <img
              src={currentuser?.imageUrl || "default_pfp.jpg"}
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-medium">{currentuser?.fullName}</p>
              <p className="text-sm text-muted-foreground">
                @{currentuser?.username}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <nav className="space-y-1 ">
            <Link href={`/profile/${currentuser?.username}`}>
              <Button variant="ghost" className="w-full justify-start gap-2 transition-transform hover:scale-[1.02] hover:shadow-xl">
                <Heart className="h-5 w-5 text-orange-500" />
                My Profile
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start gap-2 transition-transform hover:scale-[1.02] hover:shadow-xl">
              <Bike className="h-5 w-5 text-orange-500" />
              My Trips
            </Button>
            <Link href={`/blog/myblogs/${currentuser?.username}`}>
              <Button variant="ghost" className="w-full justify-start gap-2 transition-transform hover:scale-[1.02] hover:shadow-xl">
                <BookOpen className="h-5 w-5 text-orange-500" />
                My Blogs
              </Button>
            </Link>
          </nav>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex justify-between items-center">
            People you may know
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-4">
            {filteredUsers.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center gap-2">
                <img
                  src={(user.profilePicture as string) || "default_pfp.jpg"}
                  alt="Suggestion"
                  className="h-10 w-10 rounded-full"
                />
                  <div className="flex-1">
                <Link href={`/profile/${user.username}`}>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      @{user.username}
                    </p>
                </Link>
                  </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 justify-end">Follow</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
