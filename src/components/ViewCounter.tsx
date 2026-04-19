"use client";

import { useEffect, useState } from "react";

export default function ViewCounter({ postId, initialCount = 0 }: { postId: string; initialCount?: number }) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.viewCount) {
          setCount(data.viewCount);
        }
      })
      .catch(() => {});
  }, [postId]);

  return (
    <span className="text-muted-foreground">
      {count.toLocaleString()} views
    </span>
  );
}