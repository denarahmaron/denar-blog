export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { calculateReadingTime } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
  });

  if (!post) return {};

  return {
    title: `${post.title} | Denar Ahmaron`,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      authors: [post.authorId],
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || undefined,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

const post = await prisma.post.findUnique({
    where: { slug, published: true },
    include: { 
      author: { select: { name: true } },
      category: true,
    },
  });

  if (!post) notFound();

  const relatedPosts = await prisma.post.findMany({
    where: {
      published: true,
      id: { not: post.id },
      ...(post.categoryId && {
        categoryId: post.categoryId,
      }),
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="text-sm text-muted-foreground hover:text-primary transition-colors mb-8 inline-block"
      >
        ← Back to Blog
      </Link>
      <article className="bg-card rounded-2xl border border-border overflow-hidden">
        {post.coverImage && (
          <div className="relative h-64 w-full">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
            {post.category && (
              <>
                <Link 
                  href={`/blog?category=${post.category.slug}`}
                  className="text-primary hover:underline"
                >
                  {post.category.name}
                </Link>
                <span>•</span>
              </>
            )}
            <span>{post.author.name}</span>
            <span>•</span>
            <span>{calculateReadingTime(post.content)} min read</span>
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
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Related Posts</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/blog/${related.slug}`}
                className="p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
              >
                <h3 className="font-medium text-foreground text-sm line-clamp-2">
                  {related.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}