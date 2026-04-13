import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Denar Ahmaron | Junior DevOps Engineer",
  description: "Portfolio of an IT Support, System Administrator, and Junior DevOps Engineer with hands-on experience in infrastructure and DevOps",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-white text-gray-900">
        <nav className="border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold text-gray-900 hover:text-gray-600 transition">
              Denar Ahmaron
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition">
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition">
                About
              </Link>
              <Link href="/projects" className="text-gray-600 hover:text-gray-900 transition">
                Projects
              </Link>
              <Link href="/skills" className="text-gray-600 hover:text-gray-900 transition">
                Skills
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition">
                Blog
              </Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-gray-100 mt-20">
          <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© 2026 Denar Ahmaron Surya Gemilang</p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition">
                LinkedIn
              </a>
              <a href="mailto:denar@example.com" className="hover:text-gray-900 transition">
                Email
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
