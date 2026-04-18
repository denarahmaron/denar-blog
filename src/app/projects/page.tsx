import Link from "next/link";

const projects = [
  {
    title: "Homelab Infrastructure",
    description:
      "Built a self-hosted infrastructure using Proxmox VE. Deployed services such as Nextcloud and AI-based assistant tools. Configured secure remote access via Tailscale VPN. Performed live service migration with zero data loss. Fully documented architecture and setup on GitHub.",
    tech: ["Proxmox VE", "Docker", "Nextcloud", "Tailscale", "Linux"],
    highlights: ["Zero data loss migration", "Secure remote access", "Self-hosted services"],
    metric: "Self-hosted",
  },
  {
    title: "WordPress VPS Production",
    description:
      "Maintained a production VPS environment with 99%+ uptime for over 3 years. Diagnosed and resolved critical server incidents. Improved website performance (reduced load time by ~40%). Implemented Docker-based environments, security hardening, backup systems and CDN integration. Executed full server migration with zero downtime.",
    tech: ["Linux", "Nginx", "PHP", "MySQL", "Docker", "Docker Compose", "Fail2ban", "UFW"],
    highlights: ["99%+ uptime", "Zero-downtime migration", "40% faster"],
    metric: "99%+ Uptime",
  },
  {
    title: "CI/CD Pipeline for Blog Deployment",
    description:
      "Implemented automated build and deployment pipeline using GitHub Actions. Deploys to homelab server via Tailscale VPN and SSH. Includes lint checks, tests, Docker image build, and live reload.",
    tech: ["GitHub Actions", "Docker", "Tailscale", "SSH", "PostgreSQL", "Prisma"],
    highlights: ["Automated deployment", "Homelab hosting", "Full CI/CD"],
    metric: "Full Automation",
  },
];

const homelabStack = [
  { category: "Virtualization", items: ["Proxmox VE"] },
  { category: "Container", items: ["Docker", "Docker Compose"] },
  { category: "Storage", items: ["Nextcloud", "NFS"] },
  { category: "Networking", items: ["Tailscale", "UFW"] },
  { category: "Web Server", items: ["Nginx", "Caddy"] },
  { category: "Database", items: ["PostgreSQL", "MySQL"] },
];

export const metadata = {
  title: "Projects | Denar Ahmaron",
  description: "Technical projects showcasing hands-on experience in DevOps, infrastructure, and system administration.",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">Projects</h1>
        <p className="text-muted-foreground max-w-xl">
          A showcase of technical projects demonstrating hands-on production experience.
          Each project reflects real-world challenges and solutions in infrastructure,
          DevOps, and system administration.
        </p>
      </section>

      <section className="space-y-8 mb-20">
        {projects.map((project, index) => (
          <article
            key={index}
            className="p-6 sm:p-8 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {project.title}
              </h2>
              <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full whitespace-nowrap">
                {project.metric}
              </span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-secondary text-muted-foreground text-sm rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {project.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {highlight}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Homelab Stack
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {homelabStack.map((item) => (
            <div
              key={item.category}
              className="p-4 bg-card rounded-xl border border-border"
            >
              <h3 className="font-medium text-foreground mb-2">
                {item.category}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.items.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-8 border-t border-border">
        <Link
          href="/"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}