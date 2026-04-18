import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://github.com",
    label: "GitHub",
    icon: FaGithub,
  },
  {
    href: "https://linkedin.com/in/denar-ahmaron",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  {
    href: "mailto:denar@example.com",
    label: "Email",
    icon: FaEnvelope,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Denar Ahmaron
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Building reliable infrastructure for the modern web
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-border text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}