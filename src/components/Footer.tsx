import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, FacebookIcon, DribbbleIcon } from "./SocialIcons";
import { personal } from "../data";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: GithubIcon, href: personal.social.github, label: "GitHub" },
  { icon: LinkedinIcon, href: personal.social.linkedin, label: "LinkedIn" },
  { icon: TwitterIcon, href: personal.social.twitter, label: "Twitter" },
  { icon: FacebookIcon, href: personal.social.facebook, label: "Facebook" },
  { icon: DribbbleIcon, href: personal.social.dribbble, label: "Dribbble" },
];

export default function Footer() {
  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-indigo-200 dark:border-indigo-800 shadow-sm">
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {personal.firstName} <span className="text-indigo-600 dark:text-indigo-400">{personal.lastName}</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              {personal.tagline}
            </p>
            <div className="flex gap-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
              Contact
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${personal.email}`}
                  className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {personal.email}
                </a>
              </li>
              <li className="text-sm text-zinc-500 dark:text-zinc-400">{personal.location}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all"
          >
            Back to top
            <ArrowUp
              size={12}
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
