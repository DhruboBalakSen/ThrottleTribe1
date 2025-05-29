// "use client";
import PostEdit from "@/components/main/postEdit";
import { getPostById, getUserDetails } from "@/lib/queries";

async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const post = await getPostById(id);
  const user = post && (await getUserDetails(post.userId));
  return (
    <>
      {post && user && <PostEdit post={post} user={user} />}
    </>
  );
}

export default Page;
