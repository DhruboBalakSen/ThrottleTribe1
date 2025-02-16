import { UserStats } from "./user-stats";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getFollow, getUserDetails, getUserPosts } from "@/lib/queries";
import { Post } from "../main/post";
import { Toaster } from "react-hot-toast";
import Bio from "./bio";
import LeftMenu from "./leftMenu";
import Follow from "./follow";
interface Props {
  username: string;
}

export async function UserProfile({ username }: Props) {
  const [followersData, following, followersCount, followingCount] =
    await getFollow(username);
  const followers = Array.isArray(followersData)
    ? followersData.map((f) => ({ followerId: f.followerId }))
    : [];
  await auth();
  const user = await currentUser();
  const dbUser = await getUserDetails(username);
  const posts = dbUser?.username ? await getUserPosts(dbUser.username) : [];
  return (
    <div className="max-w-7xl mx-auto flex flex-col h-100vh">
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
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
              {user?.username != username ? (
                <div>
                  <p className="text-gray-800 mb-4">{dbUser.bio}</p>
                  <Follow
                    senderId={user?.username as string}
                    receiverId={dbUser.username}
                    followers={followers}
                  />{" "}
                </div>
              ) : (
                <Bio bio={dbUser.bio} username={dbUser.username} />
              )}
            </div>
            <UserStats
              followers={Number(followersCount)}
              following={Number(followingCount)}
            />
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <LeftMenu
          dob={dbUser?.dob as string}
          gender={dbUser?.gender as string}
          createdAt={
            dbUser?.createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }) as string
          }
          location={dbUser?.location as string}
        />
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts && posts.map((post) => <Post key={post.id} {...post} />)}
          </div>
        ) : (
          <div className="w-[60rem] bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
            <p className="text-gray-500 text-center">No posts yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
