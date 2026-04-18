export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(query && {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
          { excerpt: { contains: query, mode: "insensitive" } },
        ],
      }),
    },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
        <p className="text-muted-foreground">
          Thoughts on DevOps, infrastructure, and system administration.
        </p>
      </section>

      <form method="GET" action="/blog" className="mb-10">
        <div className="flex gap-3 max-w-lg">
          <input
            name="q"
            type="text"
            defaultValue={query}
            placeholder="Search articles..."
            className="flex-1 px-4 py-2.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Search
          </button>
          {query && (
            <Link
              href="/blog"
              className="px-5 py-2.5 bg-secondary text-foreground rounded-xl font-medium hover:bg-border transition-colors"
            >
              Clear
            </Link>
          )}
        </div>
        {query && (
          <p className="text-sm text-muted-foreground mt-3">
            {posts.length} results for &quot;{query}&quot;
          </p>
        )}
      </form>

      {posts.length === 0 ? (
        <div className="p-12 bg-card rounded-2xl border border-border text-center">
          <p className="text-muted-foreground">
            {query
              ? `No articles found matching "${query}"`
              : "No posts yet. Check back soon!"}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {posts.map(
            (post: {
              id: string;
              title: string;
              slug: string;
              excerpt: string | null;
              createdAt: Date;
              author: { name: string };
            }) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300"
              >
                <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{post.author.name}</span>
                  <span>•</span>
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}