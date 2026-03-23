import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, content, excerpt, published } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title dan content wajib diisi" },
        { status: 400 },
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || "",
        published: published || false,
        authorId: session.user!.id!,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json({ error: "Gagal membuat post" }, { status: 500 });
  }
}
