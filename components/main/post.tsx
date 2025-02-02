import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUserDetails } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs/server";
import PostOption from "./postOption";
import PostLike from "./postLike";

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
            <PostOption id={id}/>}
        </div>
        <p className="mb-4">{content}</p>
        {imageUrl && <img
          src={imageUrl}
          alt="Post"
          className="w-full rounded-lg mb-4"
        />}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PostLike id={id} userId={currentuser?.username as string}/>
            {/* <Button variant="ghost" size="sm" className="gap-2">
              ❤️ {10}
            </Button> */}
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              {0}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
