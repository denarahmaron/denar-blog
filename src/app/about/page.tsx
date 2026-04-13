export const dynamic = "force-dynamic";

import Link from "next/link";

export const metadata = {
  title: "About | Denar Ahmaron",
  description: "Learn more about Denar Ahmaron's journey as a Junior DevOps Engineer",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">About Me</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Professional Profile</h2>
        <div className="prose prose-gray text-gray-600 leading-relaxed">
          <p className="mb-4">
            Denar is an IT Support, System Administrator, and Junior DevOps Engineer with over 8 years of experience in IT operations and infrastructure management, evolving from field-level network operations into server, cloud, and automation environments.
          </p>
          <p>
            He brings a strong combination of real-world operational experience and hands-on technical expertise in infrastructure and DevOps.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Core Expertise</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">💻 Infrastructure & System Administration</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Linux server management (Ubuntu/Debian) in production environments</li>
              <li>VPS deployment and zero-downtime migration</li>
              <li>Web server stack: Nginx, Apache, MySQL, PHP</li>
              <li>Performance tuning and incident troubleshooting (CPU, memory, disk issues)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">⚙️ DevOps & Automation</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Docker & Docker Compose (containerization)</li>
              <li>Proxmox VE (virtualization & homelab infrastructure)</li>
              <li>Basic CI/CD pipeline implementation</li>
              <li>Environment standardization and deployment workflows</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">🌐 Networking & Security</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>TCP/IP, DNS, DHCP, SSH, VPN (Tailscale)</li>
              <li>Firewall configuration (UFW) and security hardening (Fail2ban, SSH key auth)</li>
              <li>Secure remote infrastructure access</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">🧩 IT Support & Operations</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>L1/L2 technical support and troubleshooting</li>
              <li>Incident response and resolution in production environments</li>
              <li>Ticketing systems and operational workflows</li>
              <li>Cross-functional coordination with technical and non-technical teams</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Professional Experience</h2>
        <div className="space-y-8">
          <div className="border-l-2 border-gray-900 pl-4">
            <h3 className="text-lg font-medium text-gray-900">WordPress Developer / Linux System Administrator</h3>
            <p className="text-gray-500 text-sm mb-2">Freelance</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Maintained a production VPS environment with 99%+ uptime for over 3 years</li>
              <li>Diagnosed and resolved critical server incidents with minimal downtime</li>
              <li>Improved website performance (reduced load time by ~40%)</li>
              <li>Implemented Docker-based environments, security hardening practices, backup systems and CDN integration</li>
              <li>Executed full server migration (shared hosting → VPS) with zero downtime</li>
            </ul>
          </div>
          <div className="border-l-2 border-gray-300 pl-4">
            <h3 className="text-lg font-medium text-gray-900">Operational & Administrative Staff</h3>
            <p className="text-gray-500 text-sm mb-2">Telkom Akses</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Managed 50+ monthly work orders across multiple vendor teams</li>
              <li>Coordinated with 5+ vendors and 15+ field technicians</li>
              <li>Prepared and validated project budgets (RAB) and reports</li>
              <li>Created network schematics using Visio and KML</li>
              <li>Ensured data integrity in operational systems</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Education</h2>
        <div className="border-l-2 border-gray-900 pl-4">
          <h3 className="text-lg font-medium text-gray-900">Bachelor&apos;s Degree in Informatics Engineering</h3>
          <p className="text-gray-500 text-sm mb-2">GPA: 3.32</p>
          <p className="text-gray-600 text-sm mb-2">Published research in Computer Vision (SINTA 4 Journal)</p>
          <p className="text-gray-500 text-sm">Thesis: Object Detection Optimization using YOLOv8</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Unique Selling Points</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>8+ years of real-world operational experience</li>
          <li>Hands-on production system ownership (not just projects)</li>
          <li>Built and maintained a personal homelab infrastructure</li>
          <li>Strong understanding from network layer to application layer</li>
          <li>Exposure to AI/ML (YOLOv8, Computer Vision research)</li>
        </ul>
      </section>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <Link href="/" className="text-gray-600 hover:text-gray-900 transition">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}