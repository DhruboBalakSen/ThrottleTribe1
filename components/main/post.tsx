import { MessageCircle, Share2, Bookmark, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUserDetails } from "@/lib/queries";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { currentUser } from "@clerk/nextjs/server";

export async function Post({ id, userId, content, imageUrl }: PostParams) {
  const currentuser = await currentUser();
  const user = await getUserDetails(userId);
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img
              src={user?.profilePicture || "default_pfp.jpg"}
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-muted-foreground">@{user?.username}</p>
            </div>
          </div>
          {userId === currentuser?.username &&
            <DropdownMenu>
              <DropdownMenuTrigger className="h-6 w-6 flex justify-center items-center">
                  <MoreVertical className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>}
        </div>
        <p className="mb-4">{content}</p>
        <img
          src={imageUrl || "https://placehold.co/600x300"}
          alt="Post"
          className="w-full rounded-lg mb-4"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              ❤️ {1024}
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              {1024}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
