import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json({ error: "postId is required" }, { status: 400 });
    }

    const post = await prisma.post.update({
      where: { id: postId },
      data: { viewCount: { increment: 1 } },
    });

    return NextResponse.json({ viewCount: post.viewCount });
  } catch (error) {
    console.error("POST /api/analytics error:", error);
    return NextResponse.json({ error: "Failed to track view" }, { status: 500 });
  }
}