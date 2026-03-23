import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug, published: true },
    include: { author: { select: { name: true } } },
  });

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="text-sm text-blue-600 hover:underline mb-6 inline-block"
        >
          Kembali ke Blog
        </Link>
        <article className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {post.title}
          </h1>
          <div className="flex gap-3 text-sm text-gray-400 mb-8 pb-6 border-b">
            <span>{post.author.name}</span>
            <span>•</span>
            <span>
              {new Date(post.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
            {post.content}
          </div>
        </article>
      </div>
    </div>
  );
}
