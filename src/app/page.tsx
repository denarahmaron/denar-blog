import Link from "next/link";

const skills = [
  { name: "Linux", category: "Infrastructure" },
  { name: "Docker", category: "DevOps" },
  { name: "Proxmox VE", category: "Virtualization" },
  { name: "Nginx", category: "Web Server" },
  { name: "PostgreSQL", category: "Database" },
  { name: "GitHub Actions", category: "CI/CD" },
  { name: "Tailscale", category: "Networking" },
  { name: "UFW/Fail2ban", category: "Security" },
];

const projects = [
  {
    title: "Homelab Infrastructure",
    description: "Self-hosted infrastructure using Proxmox VE with Nextcloud, AI assistants, and secure remote access via Tailscale VPN.",
    tech: ["Proxmox VE", "Nextcloud", "Tailscale", "Docker"],
    link: "/projects",
  },
  {
    title: "WordPress VPS Production",
    description: "Maintained production VPS with 99%+ uptime for 3+ years. Zero-downtime migration from shared hosting.",
    tech: ["Linux", "Nginx", "Docker", "Docker Compose"],
    link: "/projects",
  },
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <section className="mb-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Denar Ahmaron Surya Gemilang
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Junior DevOps Engineer • System Administrator • IT Support
        </p>
        <p className="text-gray-600 leading-relaxed max-w-2xl">
          IT Support, System Administrator, and Junior DevOps Engineer with over 8 years of experience in IT operations and infrastructure management. Bringing real-world operational experience with hands-on technical expertise in infrastructure and DevOps.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.name}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.link}
              className="block p-6 border border-gray-200 rounded-lg hover:border-gray-400 transition group"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex gap-4">
        <Link
          href="/about"
          className="px-5 py-2.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition"
        >
          Learn More
        </Link>
        <Link
          href="/blog"
          className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm rounded-lg hover:border-gray-400 transition"
        >
          Read Blog
        </Link>
      </section>
    </div>
  );
}
