// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("tag");

  const blogs = await prisma.blogs.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(blogs);
}
