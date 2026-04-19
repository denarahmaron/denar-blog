export const dynamic = "force-dynamic";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Logged in as {session.user?.name}
            </span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <button
                type="submit"
                className="text-sm text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/posts/new"
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Tulis Post Baru
            </h2>
            <p className="text-sm text-gray-500">
              Buat artikel baru untuk blog
            </p>
          </a>
          <a
            href="/admin/posts"
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Kelola Posts
            </h2>
            <p className="text-sm text-gray-500">Edit atau hapus artikel</p>
          </a>
          <a
            href="/admin/comments"
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Kelola Komentar
            </h2>
            <p className="text-sm text-gray-500">Approve atau hapus komentar</p>
          </a>
          <a
            href="/admin/analytics"
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Analytics
            </h2>
            <p className="text-sm text-gray-500">Lihat statistik blog</p>
          </a>
        </div>
      </div>
    </div>
  );
}
