"use client";

import Link from "next/link";

const experience = [
  {
    title: "WordPress Developer / Linux System Administrator",
    organization: "Freelance",
    period: "Present",
    highlights: [
      "Maintained production VPS with 99%+ uptime for 3+ years",
      "Reduced website load time by ~40% through performance optimization",
      "Executed zero-downtime migration (shared hosting → VPS)",
      "Implemented Docker, security hardening, backups & CDN",
    ],
  },
  {
    title: "Operational & Administrative Staff",
    organization: "Telkom Akses",
    period: "2020 - 2023",
    highlights: [
      "Managed 50+ monthly work orders across vendor teams",
      "Coordinated with 5+ vendors and 15+ field technicians",
      "Prepared and validated project budgets and reports",
      "Created network schematics using Visio and KML",
    ],
  },
];

const education = {
  degree: "Bachelor's Degree in Informatics Engineering",
  school: "University",
  details: "GPA: 3.32 • Published research in Computer Vision (SINTA 4)",
  thesis: "Object Detection Optimization using YOLOv8",
};

const usp = [
  "8+ years of real-world operational experience",
  "Hands-on production system ownership",
  "Built and maintained personal homelab infrastructure",
  "Strong understanding from network to application layer",
  "Exposure to AI/ML (YOLOv8, Computer Vision research)",
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">About Me</h1>
        <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
          From field-level network operations to managing production servers —
          I bring real-world operational experience and hands-on technical expertise
          in infrastructure and DevOps.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">Experience</h2>
        <div className="space-y-8">
          {experience.map((job, index) => (
            <div
              key={index}
              className="relative pl-8 border-l-2 border-border before:absolute before:left-[-9px] before:top-0 before:w-4 before:h-4 before:rounded-full before:bg-primary before:border-2 before:border-background"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {job.title}
              </h3>
              <p className="text-primary text-sm mb-2">
                {job.organization} • {job.period}
              </p>
              <ul className="space-y-2">
                {job.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-muted-foreground text-sm flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">Education</h2>
        <div className="p-6 bg-card rounded-2xl border border-border">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {education.degree}
          </h3>
          <p className="text-primary text-sm mb-2">{education.school}</p>
          <p className="text-muted-foreground text-sm mb-1">
            {education.details}
          </p>
          <p className="text-muted-foreground text-sm">
            Thesis: {education.thesis}
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          What Makes Me Different
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {usp.map((item) => (
            <div
              key={item}
              className="p-4 bg-card rounded-xl border border-border flex items-center gap-3"
            >
              <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
              <span className="text-foreground text-sm">{item}</span>
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