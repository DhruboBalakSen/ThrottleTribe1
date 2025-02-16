import { Header } from '@/components/main/header'
import PostComment from '@/components/main/postComment'
import { getPostById } from '@/lib/queries'
import React from 'react'

const Page = async ({params} : {params : Promise<{id: number}>}) => {
  const post = await getPostById(Number((await params).id))
  return (
    <div>
      <Header />
      <PostComment id={Number(post?.id)} username={post?.userId as string} content={post?.content as string} imageUrl={post?.imageUrl || ""}/>
    </div>
    
  )
}


export default Page