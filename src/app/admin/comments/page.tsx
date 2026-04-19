export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function AdminCommentsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      post: { select: { title: true, slug: true } },
    },
  });

  async function approveComment(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.comment.update({
      where: { id },
      data: { approved: true },
    });
    revalidatePath("/admin/comments");
  }

  async function deleteComment(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.comment.delete({ where: { id } });
    revalidatePath("/admin/comments");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Kelola Komentar</h1>
          <a href="/admin" className="text-sm text-gray-500 hover:text-gray-700">
            Dashboard
          </a>
        </div>

        {comments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
            Belum ada komentar.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm divide-y">
            {comments.map((comment) => (
              <div key={comment.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-800">
                        {comment.name}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          comment.approved
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {comment.approved ? "Approved" : "Pending"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{comment.content}</p>
                    <p className="text-xs text-gray-400">
                      on{" "}
                      <a
                        href={`/blog/${comment.post.slug}`}
                        className="text-blue-600 hover:underline"
                      >
                        {comment.post.title}
                      </a>
                      {" "}
                      •{" "}
                      {new Date(comment.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!comment.approved && (
                      <form action={approveComment}>
                        <input type="hidden" name="id" value={comment.id} />
                        <button
                          type="submit"
                          className="text-sm text-green-600 hover:underline"
                        >
                          Approve
                        </button>
                      </form>
                    )}
                    <form action={deleteComment}>
                      <input type="hidden" name="id" value={comment.id} />
                      <button
                        type="submit"
                        className="text-sm text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}