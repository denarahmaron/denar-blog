import Link from "next/link";

const skillCategories = [
  {
    title: "Infrastructure & SysAdmin",
    level: "Expert",
    levelColor: "text-green-400",
    skills: [
      { name: "Linux (Ubuntu/Debian)", level: 90 },
      { name: "VPS Deployment & Migration", level: 85 },
      { name: "Nginx / Apache", level: 80 },
      { name: "MySQL / PostgreSQL", level: 75 },
    ],
  },
  {
    title: "DevOps & Automation",
    level: "Intermediate",
    levelColor: "text-blue-400",
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
    levelColor: "text-blue-400",
    skills: [
      { name: "TCP/IP, DNS, DHCP", level: 75 },
      { name: "Tailscale VPN", level: 80 },
      { name: "UFW / Firewall", level: 75 },
      { name: "Fail2ban / Security", level: 70 },
    ],
  },
  {
    title: "IT Support & Operations",
    level: "Expert",
    levelColor: "text-green-400",
    skills: [
      { name: "Technical Support (L1/L2)", level: 90 },
      { name: "Incident Response", level: 85 },
      { name: "Ticketing Systems", level: 80 },
      { name: "Documentation", level: 85 },
    ],
  },
];

const tools = [
  "Ubuntu",
  "Debian",
  "Docker",
  "Docker Compose",
  "Proxmox VE",
  "Nginx",
  "Apache",
  "PostgreSQL",
  "MySQL",
  "GitHub Actions",
  "Tailscale",
  "UFW",
  "Fail2ban",
  "SSH",
  "Nextcloud",
];

export const metadata = {
  title: "Skills | Denar Ahmaron",
  description: "Technical skills and expertise in DevOps, Infrastructure, and System Administration.",
};

export default function SkillsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">Skills</h1>
        <p className="text-muted-foreground max-w-xl">
          Technical expertise built through years of hands-on production experience.
          From server management to automation pipelines.
        </p>
      </section>

      <section className="space-y-10 mb-20">
        {skillCategories.map((category) => (
          <div key={category.title} className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                {category.title}
              </h2>
              <span className={`text-sm ${category.levelColor}`}>
                {category.level}
              </span>
            </div>
            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-foreground">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-transform duration-500 group-hover:scale-x-100"
                      style={{
                        width: `${skill.level}%`,
                        transformOrigin: "left",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Tools & Technologies
        </h2>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1.5 bg-secondary text-muted-foreground text-sm rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
            >
              {tool}
            </span>
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