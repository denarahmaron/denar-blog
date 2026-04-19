"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NewPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setCategories([]))
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const formData = new FormData(e.currentTarget)
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        content: formData.get("content"),
        excerpt: formData.get("excerpt"),
        coverImage: formData.get("coverImage"),
        categoryId: formData.get("categoryId") || null,
        published: formData.get("published") === "on",
      }),
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error || "Gagal menyimpan post")
      setLoading(false)
      return
    }
    router.push("/admin/posts")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Tulis Post Baru</h1>
          <a href="/admin" className="text-sm text-gray-500 hover:text-gray-700">Kembali</a>
        </div>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
            <input name="title" type="text" required className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Judul artikel..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <input name="excerpt" type="text" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ringkasan singkat..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
            <input name="coverImage" type="url" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://example.com/image.jpg" />
            <p className="text-xs text-gray-500 mt-1">URL gambar untuk thumbnail</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select name="categoryId" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Pilih kategori...</option>
              {categories.map((cat: { id: string; name: string }) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konten</label>
            <textarea name="content" required rows={12} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" placeholder="Tulis konten artikel di sini..." />
          </div>
          <div className="flex items-center gap-2">
            <input name="published" type="checkbox" id="published" className="rounded" />
            <label htmlFor="published" className="text-sm text-gray-700">Publish sekarang</label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50 transition text-sm">{loading ? "Menyimpan..." : "Simpan Post"}</button>
            <a href="/admin/posts" className="px-6 py-2 rounded border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition">Batal</a>
          </div>
        </form>
      </div>
    </div>
  )
}
