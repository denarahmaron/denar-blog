import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        post: { select: { title: true, slug: true } },
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("GET /api/admin/comments error:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}