export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPostsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Kelola Posts</h1>
          <div className="flex gap-3">
            <a
              href="/admin/posts/new"
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
            >
              Tulis Baru
            </a>
            <a
              href="/admin"
              className="text-sm text-gray-500 hover:text-gray-700 py-2"
            >
              Dashboard
            </a>
          </div>
        </div>
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
            Belum ada post.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm divide-y">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="font-medium text-gray-800">{post.title}</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    {post.published ? "Published" : "Draft"} •{" "}
                    {new Date(post.createdAt).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`/admin/posts/${post.id}/edit`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </a>
                  <span className="text-gray-300">|</span>
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-sm text-gray-500 hover:underline"
                    target="_blank"
                  >
                    Lihat
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
