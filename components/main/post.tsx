import { MessageCircle, Share2, Bookmark, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUserDetails } from "@/lib/queries";

export async function Post({ userId, content, imageUrl }: PostParams) {
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
              <p className="text-sm text-muted-foreground">
                @{user?.username}
              </p>
            </div>
          </div>
        </div>
        <p className="mb-4">
          {content}
          {/* <Button variant="link" className="px-0">
            Read More
          </Button> */}
        </p>
        <img src={imageUrl || "https://placehold.co/600x300"} alt="Post" className="w-full rounded-lg mb-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              ❤️ {1024}
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              {1024}
            </Button>
            {/* <Button variant="ghost" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              {shares}
            </Button> */}
          </div>
          {/* <Button variant="ghost" size="icon">
            <Bookmark className="h-5 w-5" />
          </Button> */}
        </div>
      </CardContent>
    </Card>
  );
}
