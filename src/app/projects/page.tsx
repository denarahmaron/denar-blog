import Link from "next/link";

const projects = [
  {
    title: "Homelab Infrastructure Server",
    description: "Built a self-hosted infrastructure using Proxmox VE. Deployed services such as Nextcloud and AI-based assistant tools. Configured secure remote access via Tailscale VPN. Performed live service migration with zero data loss. Fully documented architecture and setup on GitHub.",
    tech: ["Proxmox VE", "Docker", "Nextcloud", "Tailscale", "Linux"],
    highlights: ["Zero data loss migration", "Secure remote access", "Self-hosted services"],
  },
  {
    title: "WordPress VPS Production",
    description: "Maintained a production VPS environment with 99%+ uptime for over 3 years. Diagnosed and resolved critical server incidents with minimal downtime. Improved website performance (reduced load time by ~40%). Implemented Docker-based environments, security hardening practices, backup systems and CDN integration. Executed full server migration (shared hosting → VPS) with zero downtime.",
    tech: ["Linux", "Nginx", "PHP", "MySQL", "Docker", "Docker Compose", "Fail2ban", "UFW"],
    highlights: ["99%+ uptime", "Zero-downtime migration", "40% performance improvement"],
  },
  {
    title: "CI/CD Pipeline for Blog Deployment",
    description: "Implemented automated build and deployment pipeline using GitHub Actions. Deploys to homelab server via Tailscale VPN and SSH. Includes lint checks, tests, Docker image build, and live reload.",
    tech: ["GitHub Actions", "Docker", "Tailscale", "SSH", "PostgreSQL", "Prisma"],
    highlights: ["Automated deployment", "Homelab hosting", "Full CI/CD workflow"],
  },
];

export const metadata = {
  title: "Projects | Denar Ahmaron",
  description: "Showcase of Denar Ahmaron's technical projects including homelab infrastructure and production deployments",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Projects</h1>
      <p className="text-gray-600 mb-12">
        A showcase of technical projects demonstrating hands-on experience in infrastructure, DevOps, and system administration.
      </p>

      <div className="space-y-12">
        {projects.map((project, index) => (
          <section key={index} className="border-b border-gray-100 pb-12 last:border-0">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">{project.title}</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span key={tech} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {project.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-1.5 text-sm text-gray-500">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                  {highlight}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Homelab Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900">Virtualization</h3>
            <p className="text-gray-500">Proxmox VE</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900">Container</h3>
            <p className="text-gray-500">Docker, Docker Compose</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900">Storage</h3>
            <p className="text-gray-500">Nextcloud, NFS</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900">Networking</h3>
            <p className="text-gray-500">Tailscale, UFW</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900">Web Server</h3>
            <p className="text-gray-500">Nginx, Caddy</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900">Database</h3>
            <p className="text-gray-500">PostgreSQL, MySQL</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-gray-600 hover:text-gray-900 transition">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}