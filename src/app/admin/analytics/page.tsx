"use client";

import { useEffect, useState } from "react";

interface AnalyticsData {
  totalPosts: number;
  publishedPosts: number;
  totalComments: number;
  pendingComments: number;
  postsWithViews: Array<{
    title: string;
    slug: string;
    viewCount: number;
  }>;
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Total Posts</p>
            <p className="text-2xl font-bold text-gray-800">{data?.totalPosts || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Published</p>
            <p className="text-2xl font-bold text-green-600">{data?.publishedPosts || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Comments</p>
            <p className="text-2xl font-bold text-gray-800">{data?.totalComments || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{data?.pendingComments || 0}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Posts by Views</h2>
          <div className="space-y-3">
            {data?.postsWithViews?.map((post: { title: string; slug: string; viewCount: number }, index: number) => (
              <div key={post.slug} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-600">
                  {index + 1}. {post.title}
                </span>
                <span className="text-sm text-gray-500">
                  {post.viewCount.toLocaleString()} views
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}