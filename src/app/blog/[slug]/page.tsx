export const dynamic = "force-dynamic";

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
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="text-sm text-muted-foreground hover:text-primary transition-colors mb-8 inline-block"
      >
        ← Back to Blog
      </Link>
      <article className="bg-card rounded-2xl border border-border p-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
          <span>{post.author.name}</span>
          <span>•</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="prose prose-invert max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>
      </article>
    </div>
  );
}