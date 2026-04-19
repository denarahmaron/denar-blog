"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { useEffect } from "react";

const lowlight = createLowlight(common);

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({ content, onChange, placeholder = "Tulis konten artikel..." }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getText());
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none min-h-[300px] focus:outline-none p-4 text-foreground leading-relaxed",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getText()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-300">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("bold") ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("italic") ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("strike") ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <s>S</s>
        </button>
        <span className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("heading", { level: 1 }) ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("heading", { level: 2 }) ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("heading", { level: 3 }) ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          H3
        </button>
        <span className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("bulletList") ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          •
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("orderedList") ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          1.
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("blockquote") ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          &quot;
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("codeBlock") ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {"</>"}
        </button>
        <span className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Enter URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            editor.isActive("link") ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          🔗
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="px-3 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition"
        >
          ↩
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="px-3 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition"
        >
          ↪
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}