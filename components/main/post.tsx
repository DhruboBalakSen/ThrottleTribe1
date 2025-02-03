import { Card, CardContent } from "@/components/ui/card";
import { getUserDetails } from "@/lib/queries";
import { auth, currentUser } from "@clerk/nextjs/server";
import PostOption from "./postOption";
import PostActions from "./postActions";
import Link from "next/link";

export async function Post({ id, userId, content, imageUrl }: PostParams) {
  const currentuser = await currentUser();
  const user = await getUserDetails(userId);
  return (
    <Card className="mb-4 shadow-md">
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
          {userId === currentuser?.username && <PostOption id={id} />}
        </div>
        <p className="mb-4">{content}</p>
        <Link href={`/post/${id}`}>
          {imageUrl && (
            <img src={imageUrl} alt="Post" className="w-full rounded-lg mb-4" />
          )}
        </Link>
        <PostActions id={id} userId={currentuser?.username as string} />
      </CardContent>
    </Card>
  );
}
