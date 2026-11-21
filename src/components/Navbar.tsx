import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { personal } from "../data";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Edge detection for top & bottom of page
      if (window.scrollY < 120) {
        setActiveSection("home");
        return;
      }
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.scrollY >= 120) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-800/60 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleNav("#home")}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-indigo-200 dark:border-indigo-800 shadow-sm transition-transform group-hover:scale-110">
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {personal.firstName}
                <span className="text-indigo-600 dark:text-indigo-400"> {personal.lastName}</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 -z-10"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-200"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.span>
                </AnimatePresence>
              </button>

              <a
                href={personal.cvUrl}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-200 shadow-sm shadow-indigo-500/20"
              >
                <Download size={14} />
                Resume
              </a>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 shadow-xl lg:hidden"
          >
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(link.href)}
                  className={`px-4 py-3 rounded-lg text-left text-sm font-medium transition-all ${
                    activeSection === link.href.replace("#", "")
                      ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <a
                  href={personal.cvUrl}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all"
                >
                  <Download size={14} />
                  Download Resume
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
