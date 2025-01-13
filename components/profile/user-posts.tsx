import { getUserPosts } from "@/lib/queries"
import { Post } from "../main/post"

export async function UserPosts({ userId,content,imageUrl }: PostParams) {
    const posts = await getUserPosts(userId);
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Post
          key={post.id}
          {...post}
        />
      ))}
    </div>
  )
}

