import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { id } = await req.json();
        await prisma.blogs.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Blog deleted successfully." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete blog." }, { status: 500 });
    }
}
