import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: { select: { name: true } } },
    })
    if (!post) return NextResponse.json({ error: "Post tidak ditemukan" }, { status: 404 })
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: "Gagal mengambil post" }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id } = await params
    const { title, content, excerpt, published } = await req.json()

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim()

    const post = await prisma.post.update({
      where: { id },
      data: { title, slug, content, excerpt, published },
    })

    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: "Gagal update post" }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id } = await params
    await prisma.post.delete({ where: { id } })
    return NextResponse.json({ message: "Post berhasil dihapus" })
  } catch {
    return NextResponse.json({ error: "Gagal menghapus post" }, { status: 500 })
  }
}
