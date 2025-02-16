import { getFollow, toggleFollow } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const {senderId, receiverId} = await request.json();
        const res = await toggleFollow(senderId,receiverId)
        return NextResponse.json({res},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Unable to fetch followers & following" },
            { status: 500 }
          );
    }
}