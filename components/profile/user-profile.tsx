import { UserStats } from "./user-stats";
import { currentUser } from "@clerk/nextjs/server";
import { getUserDetails, getUserPosts } from "@/lib/queries";
import { Post } from "../main/post";
import { Toaster } from "react-hot-toast";
import Bio from "./bio";

export async function UserProfile() {
  const user = await currentUser();
  const dbUser = user?.username ? await getUserDetails(user.username) : null;
  const posts = dbUser?.username ? await getUserPosts(dbUser.username) : [];
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {dbUser && (
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Toaster position="top-right" />
            <img
              src={dbUser.profilePicture || "default_pfp.jpg"}
              alt="userprofilephoto"
              className="w-32 h-32 rounded-full"
            />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold">{dbUser.name}</h1>
              <p className="text-gray-600 mb-2">@{dbUser.username}</p>
              <Bio bio={dbUser.bio} username={dbUser.username} />
            </div>
            <UserStats
              followers={dbUser.follower}
              following={dbUser.following}
            />
          </div>
        )}
      </div>
      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts && posts.map((post) => <Post key={post.id} {...post} />)}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-500 text-center">No posts yet.</p>
        </div>
      )}
    </div>
  );
}
