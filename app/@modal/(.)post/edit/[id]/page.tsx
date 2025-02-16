// "use client";
import { Header } from "@/components/main/header";
import PostEdit from "@/components/main/postEdit";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getPostById, getUserDetails } from "@/lib/queries"

async function Page({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const id  = Number((await params).id);
  const post = await getPostById(id);
  const user = post && await getUserDetails(post.userId);
  return (
    <>
      <PostEdit post={post} user={user} />
    </>
  )
}

export default Page