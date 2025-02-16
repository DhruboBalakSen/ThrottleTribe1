import { createBlog, updateBlog } from "@/lib/queries";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { author,title,content,imageUrl,tags } = await request.json();
        const res = await createBlog(title,author,content,tags,imageUrl)
        return NextResponse.json({message:"Created Blog"},{status:200})
    } catch (error) {
        return NextResponse.json(
            { error: "Unable to create Blog" },
            { status: 500 }
          );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const { id,title,content,imageUrl,tags } = await request.json();
        const data = imageUrl === "" ? {title,content,tags} : {title,content,tags,imageUrl}
        const blog = await updateBlog(id,data)
        return NextResponse.json({message:"Created Blog"},{status:200})
    } catch (error) {
        return NextResponse.json(
            { error: "Unable to create Blog" },
            { status: 500 }
          );
    }
}



