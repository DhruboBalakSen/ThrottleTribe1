import { UserStats } from "./user-stats"
import { UserPosts } from "./user-posts"
// import { UserAvatar } from "@/components/ui/user-avatar"
import { Button } from "@/components/ui/button"
import { currentUser } from "@clerk/nextjs/server"


export async function UserProfile() {

    const user = await currentUser();
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img src={user?.imageUrl} alt="userprofilephoto" className="w-32 h-32 rounded-full" />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold">{user?.fullName}</h1>
            <p className="text-gray-600 mb-2">@{user?.username}</p>
            <p className="text-gray-800 mb-4">{user?.publicMetadata.bio as string}</p>
            {/* <Button className="bg-orange-500 hover:bg-orange-600">Follow</Button> */}
          </div>
          {/* <UserStats followers={user?.followers} following={user.following} /> */}
        </div>
      </div>
      {/* <UserPosts posts={posts} /> */}
    </div>
  )
}

