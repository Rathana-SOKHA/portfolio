import { motion } from "framer-motion";
import { ArrowRight, Mail, Circle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { GithubIcon, LinkedinIcon, TelegramIcon, FacebookIcon } from "../components/animations/SocialIcons";
import { personal } from "../data";

const socialIcons = [
  { icon: GithubIcon, href: personal.social.github, label: "GitHub" },
  { icon: LinkedinIcon, href: personal.social.linkedin, label: "LinkedIn" },
  { icon: TelegramIcon, href: personal.social.telegram, label: "Telegram" },
  { icon: FacebookIcon, href: personal.social.facebook, label: "Facebook" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  const { t } = useTranslation();
  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-12"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] opacity-60 dark:opacity-40" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/8 dark:bg-indigo-500/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-violet-500/6 dark:bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center py-12 lg:py-20">
          {/* Left — text content (takes 7 cols on desktop) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-7"
          >
            {/* Availability badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40">
                <Circle size={6} className="fill-emerald-500 text-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  {t("hero.available", personal.availabilityText)}
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.08]">
                {t("personal.firstName", personal.firstName)}{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  {t("personal.lastName", personal.lastName)}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-medium">
                {t("hero.title", personal.title)}
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed max-w-xl"
            >
              {t("hero.tagline", personal.tagline)}
            </motion.p>

            {/* Bio short */}
            <motion.p
              variants={itemVariants}
              className="text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl text-sm"
            >
              {t("about.bio1", personal.bio)}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => handleNav("#projects")}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-200 shadow-lg shadow-indigo-500/20 cursor-pointer"
              >
                {t("hero.viewWork", "View My Work")}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
              <button
                onClick={() => handleNav("#contact")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all duration-200 cursor-pointer"
              >
                <Mail size={16} />
                {t("hero.getInTouch", "Contact Me")}
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 pt-2">
              <span className="text-xs text-zinc-400 dark:text-zinc-500 mr-2 font-medium">Find me on</span>
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — avatar showcase (takes 5 cols on desktop, anchored cleanly to the right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:col-span-5 flex justify-center lg:justify-end items-center"
          >
            {/* Unified Visual Container */}
            <div className="relative flex items-center justify-center p-2 sm:p-4">
              {/* Outer spinning dashed ring - centered directly around the avatar */}
              <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] rounded-full border border-dashed border-indigo-200/80 dark:border-indigo-800/50 animate-[spin_35s_linear_infinite] pointer-events-none" />

              {/* Inner subtle static ring */}
              <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px] rounded-full border border-zinc-200/80 dark:border-zinc-800/60 pointer-events-none" />

              {/* Ambient radial blur glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/20 via-violet-500/15 to-transparent blur-3xl scale-110 pointer-events-none" />

              {/* Avatar Box */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-[320px] lg:h-[320px] rounded-3xl overflow-hidden border-2 border-white dark:border-zinc-800 shadow-2xl shadow-indigo-500/10 dark:shadow-zinc-950/80 bg-zinc-100 dark:bg-zinc-900">
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Floating badge — experience (top right) */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="absolute -right-2 sm:-right-4 top-3 sm:top-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-xl border border-zinc-100 dark:border-zinc-800 z-10"
              >
                <p className="text-lg sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">5+</p>
                <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  {t("hero.experienceYears", "Years of Experience")}
                </p>
              </motion.div>

              {/* Floating badge — projects (bottom left) */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute -left-2 sm:-left-4 bottom-4 sm:bottom-8 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-xl border border-zinc-100 dark:border-zinc-800 z-10"
              >
                <p className="text-lg sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">20+</p>
                <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  {t("hero.projectsCompleted", "Projects Done")}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center pt-8 pb-4"
        >
          <button
            onClick={() => handleNav("#about")}
            className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-600 hover:text-indigo-500 transition-colors"
          >
            <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-px h-8 bg-current"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
