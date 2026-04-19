import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [totalPosts, publishedPosts, totalComments, pendingComments, postsWithViews] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { published: true } }),
      prisma.comment.count(),
      prisma.comment.count({ where: { approved: false } }),
      prisma.post.findMany({
        where: { published: true },
        orderBy: { viewCount: "desc" },
        take: 10,
        select: {
          title: true,
          slug: true,
          viewCount: true,
        },
      }),
    ]);

    return NextResponse.json({
      totalPosts,
      publishedPosts,
      totalComments,
      pendingComments,
      postsWithViews,
    });
  } catch (error) {
    console.error("GET /api/admin/analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}