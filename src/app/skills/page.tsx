import Link from "next/link";

export const metadata = {
  title: "Skills | Denar Ahmaron",
  description: "Technical skills and expertise of Denar Ahmaron in DevOps, Infrastructure, and System Administration",
};

const skillCategories = [
  {
    title: "Infrastructure & System Administration",
    level: "Expert",
    skills: [
      { name: "Linux (Ubuntu/Debian)", level: 90 },
      { name: "VPS Deployment & Migration", level: 85 },
      { name: "Nginx / Apache", level: 80 },
      { name: "MySQL / PostgreSQL", level: 75 },
      { name: "Performance Tuning", level: 70 },
    ],
  },
  {
    title: "DevOps & Automation",
    level: "Intermediate",
    skills: [
      { name: "Docker & Docker Compose", level: 85 },
      { name: "Proxmox VE", level: 80 },
      { name: "CI/CD (GitHub Actions)", level: 75 },
      { name: "Infrastructure as Code", level: 60 },
    ],
  },
  {
    title: "Networking & Security",
    level: "Intermediate",
    skills: [
      { name: "TCP/IP, DNS, DHCP", level: 75 },
      { name: "Tailscale VPN", level: 80 },
      { name: "UFW / Firewall", level: 75 },
      { name: "Fail2ban / Security Hardening", level: 70 },
      { name: "SSH Key Authentication", level: 80 },
    ],
  },
  {
    title: "IT Support & Operations",
    level: "Expert",
    skills: [
      { name: "Technical Support (L1/L2)", level: 90 },
      { name: "Incident Response", level: 85 },
      { name: "Ticketing Systems", level: 80 },
      { name: "Documentation", level: 85 },
    ],
  },
];

export default function SkillsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Skills</h1>
      <p className="text-gray-600 mb-12">
        Technical expertise spanning infrastructure, DevOps, networking, and IT operations.
      </p>

      <div className="space-y-12">
        {skillCategories.map((category) => (
          <section key={category.title}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
              <span className="text-sm text-gray-500">{category.level}</span>
            </div>
            <div className="space-y-3">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{skill.name}</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-900 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tools I Use</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "Ubuntu", "Debian", "Docker", "Docker Compose", "Proxmox VE",
            "Nginx", "Apache", "PostgreSQL", "MySQL", "GitHub Actions",
            "Tailscale", "UFW", "Fail2ban", "SSH", "Nextcloud",
            "YOLOv8", "Computer Vision", "Linux Server", "VPS", "CI/CD"
          ].map((tool) => (
            <span key={tool} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <Link href="/" className="text-gray-600 hover:text-gray-900 transition">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}