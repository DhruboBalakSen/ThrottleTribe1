import { getBlogComments, getUserDetails } from "@/lib/queries";
import React from "react";
import Image from "next/image";

async function BlogComments({ id }: { id: number }) {
  const comments = await getBlogComments(id);

  const users = comments
    ? await Promise.all(
        comments.map((comment) => getUserDetails(comment.userId))
      )
    : [];

  return (
    <div className="mt-10 border-t pt-6">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <div className="space-y-4">
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => {
            const user = users[index];
            return (
              <div key={comment.id} className="flex space-x-4">
                <Image
                  src={user?.profilePicture || "/placeholder.svg"}
                  alt="User profile"
                  height={40}
                  width={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{user?.username}</p>
                  <p className="text-sm text-gray-600">{comment.commentText}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}

export default BlogComments;
