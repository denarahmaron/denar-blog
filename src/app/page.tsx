import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { author: { select: { name: true } } },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Blog CMS</h1>
          <p className="text-gray-500">Artikel terbaru</p>
        </div>
        {posts.length === 0 ? (
          <p className="text-gray-500">Belum ada artikel yang dipublish.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition">
                    {post.title}
                  </h2>
                </Link>
                {post.excerpt && (
                  <p className="text-gray-500 mt-2 text-sm">{post.excerpt}</p>
                )}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Baca selengkapnya
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 flex gap-4">
          <Link href="/blog" className="text-sm text-blue-600 hover:underline">
            Lihat semua artikel
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/admin" className="text-sm text-gray-500 hover:underline">
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
