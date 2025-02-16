import { getComments, getUserDetails } from "@/lib/queries";
import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";
import { Card, CardContent } from "../ui/card";
import PostActions from "./postActions";
import { Comments } from "./comment";
import { Toaster } from "react-hot-toast";
interface PostParams {
  id: number;
  username: string;
  content: string;
  imageUrl: string;
}

const PostComment = async ({ id, username, content, imageUrl }: PostParams) => {
  await auth();
  const currentuser = await currentUser();
  const user = await getUserDetails(username);
  const comments = await getComments(id);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center backdrop-blur-md">
      <div className="flex items-center justify-center max-w-4xl mx-auto my-20">
        <Card className="mb-4 shadow-md">
          <Toaster position="top-right" />
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex flex-col justify-between">
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
                <p className="mb-4">{content}</p>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Post"
                    className="w-full rounded-lg mb-4"
                  />
                )}
                <PostActions id={id} userId={currentuser?.username as string} />
              </div>
              <Comments comments={comments} postId={id} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostComment;
