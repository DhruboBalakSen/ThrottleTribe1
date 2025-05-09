import { Post } from "./post";
import Create from "./create";
import { getPosts } from "@/lib/queries";

export async function Feed() {
  const posts = await getPosts();
  return (
    <div className="flex-1 max-w-full mx-auto">
      <Create />
      {posts && posts.map((post) => <Post key={post.id} {...post} />)}
    </div>
  );
}
