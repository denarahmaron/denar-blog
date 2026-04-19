"use client";

import { FaTwitter, FaLinkedin, FaLink } from "react-icons/fa";

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert("Link copied!");
    } catch {
      alert("Failed to copy link");
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Share:</span>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-secondary text-foreground hover:bg-border transition-colors"
        aria-label="Share on Twitter"
      >
        <FaTwitter className="w-4 h-4" />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-secondary text-foreground hover:bg-border transition-colors"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin className="w-4 h-4" />
      </a>
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-lg bg-secondary text-foreground hover:bg-border transition-colors"
        aria-label="Copy link"
      >
        <FaLink className="w-4 h-4" />
      </button>
    </div>
  );
}