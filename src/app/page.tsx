import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const techStack = [
  "Linux",
  "Docker",
  "Nginx",
  "PostgreSQL",
  "Proxmox",
  "Tailscale",
];

const featuredProjects = [
  {
    title: "Homelab Infrastructure",
    description:
      "Self-hosted infrastructure using Proxmox VE with Nextcloud, AI assistants, and secure remote access via Tailscale VPN.",
    tech: ["Proxmox VE", "Nextcloud", "Tailscale", "Docker"],
    metric: "Zero data loss",
    href: "/projects",
  },
  {
    title: "WordPress VPS Production",
    description:
      "Maintained production VPS with 99%+ uptime for 3+ years. Zero-downtime migration from shared hosting.",
    tech: ["Linux", "Nginx", "Docker", "Docker Compose"],
    metric: "99%+ uptime",
    href: "/projects",
  },
];

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <div className="max-w-5xl mx-auto px-6">
      <section className="min-h-[85vh] flex flex-col lg:flex-row items-center justify-center gap-16 py-20">
        <div className="animate-slide-up flex-1 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Available for work
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Building Reliable<br />
            <span className="text-gradient">Infrastructure</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            DevOps Engineer with <span className="text-foreground font-semibold">8+ years</span> of hands-on production experience.
            I specialize in building resilient systems, automating workflows,
            and keeping things running smoothly.
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-card/80 backdrop-blur-sm border border-border text-muted-foreground text-sm rounded-lg hover:border-primary/50 hover:text-foreground transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all hover:scale-105"
            >
              View Projects
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 bg-card border border-border text-foreground rounded-xl font-medium hover:border-primary/50 transition-all hover:scale-105"
            >
              About Me
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              Read Blog →
            </Link>
          </div>
        </div>

        <div className="hidden lg:block relative group">
          <div className="absolute -inset-8 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30 rounded-3xl blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          <div className="absolute inset-0 bg-grid-pattern opacity-5" />

          <div className="relative">
            <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-card/90 backdrop-blur-md border border-border rounded-full shadow-lg">
              <span className="text-xs text-muted-foreground font-mono">~/devops</span>
            </div>

            <div className="relative w-80 h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm group-hover:scale-[1.02] transition-transform duration-500">
              <Image
                src="/profile.jpg"
                alt="Denar Ahmaron"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs font-mono">Online</span>
                </div>
                <p className="text-white font-semibold text-lg mt-2">Denar Ahmaron</p>
                <p className="text-gray-400 text-sm">DevOps Engineer</p>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-card/90 backdrop-blur-md border border-border rounded-xl shadow-lg">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span className="text-xs text-muted-foreground font-mono">8+ yrs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Featured Projects</h2>
          <Link
            href="/projects"
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            View all →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                  {project.metric}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 bg-secondary text-muted-foreground text-xs rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Latest Posts</h2>
          <Link
            href="/blog"
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Read all →
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group p-5 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300"
              >
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No posts yet. Check back soon!</p>
        )}
      </section>
    </div>
  );
}