"use client";

import { useState, useEffect } from "react";

type Comment = {
  id: string;
  name: string;
  content: string;
  createdAt: string;
};

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/comments?postId=${postId}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [postId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        content: formData.get("content"),
        postId,
      }),
    });

    if (res.ok) {
      setMessage("Komentar berhasil! Akan muncul setelah disetujui.");
      e.currentTarget.reset();
    } else {
      setMessage("Gagal mengirim komentar.");
    }
    setSubmitting(false);
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Komentar ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 mb-8">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Nama
            </label>
            <input
              name="name"
              type="text"
              required
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              placeholder="Nama Anda..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Komentar
            </label>
            <textarea
              name="content"
              required
              rows={3}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              placeholder="Tulis komentar..."
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 transition"
          >
            {submitting ? "Mengirim..." : "Kirim Komentar"}
          </button>
          {message && (
            <p className="text-sm text-muted-foreground">{message}</p>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : comments.length === 0 ? (
        <p className="text-muted-foreground">Belum ada komentar.</p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-card rounded-xl border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-foreground">{comment.name}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString("id-ID")}
                </span>
              </div>
              <p className="text-muted-foreground">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}