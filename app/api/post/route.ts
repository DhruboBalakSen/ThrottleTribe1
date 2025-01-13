import { NextRequest,NextResponse } from "next/server";
import prisma from "@/lib/db";
import { createPost } from "@/lib/queries";

export async function POST(request:NextRequest){
    try {
        
    } catch (error) {
        console.error("Unable to post: ",error);
        return NextResponse.json({error:'Unable to create post'}, {status : 500})
    }
}