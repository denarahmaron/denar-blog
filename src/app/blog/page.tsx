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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Blog</h1>
          <Link
            href="/admin"
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            Admin
          </Link>
        </div>

        <form method="GET" action="/blog" className="mb-8">
          <div className="flex gap-2">
            <input
              name="q"
              type="text"
              defaultValue={query}
              placeholder="Cari artikel..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              Cari
            </button>
            {query && (
              <Link
                href="/blog"
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition"
              >
                Reset
              </Link>
            )}
          </div>
          {query && (
            <p className="text-sm text-gray-500 mt-2">
              {posts.length} hasil untuk &quot;{query}&quot;
            </p>
          )}
        </form>

        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
            {query
              ? `Tidak ada artikel yang cocok dengan "${query}"`
              : "Belum ada artikel."}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map(
              (post: {
                id: string;
                title: string;
                slug: string;
                excerpt: string | null;
                createdAt: Date;
                author: { name: string };
              }) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition">
                      {post.title}
                    </h2>
                  </Link>
                  {post.excerpt && (
                    <p className="text-gray-500 mt-2 text-sm">{post.excerpt}</p>
                  )}
                  <div className="flex gap-3 mt-4 text-xs text-gray-400">
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
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
