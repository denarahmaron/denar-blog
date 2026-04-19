"use client";

import { useMemo } from "react";
import { marked } from "marked";

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const html = useMemo(() => {
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
    return marked(content) as string;
  }, [content]);

  return (
    <div 
      className="prose prose-invert max-w-none text-muted-foreground leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}