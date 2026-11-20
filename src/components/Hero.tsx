import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Circle } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, FacebookIcon, DribbbleIcon } from "./SocialIcons";
import { personal } from "../data";

const socialIcons = [
  { icon: GithubIcon, href: personal.social.github, label: "GitHub" },
  { icon: LinkedinIcon, href: personal.social.linkedin, label: "LinkedIn" },
  { icon: TwitterIcon, href: personal.social.twitter, label: "Twitter" },
  { icon: FacebookIcon, href: personal.social.facebook, label: "Facebook" },
  { icon: DribbbleIcon, href: personal.social.dribbble, label: "Dribbble" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] opacity-60 dark:opacity-40" />

      {/* Gradient orb */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/8 dark:bg-indigo-500/12 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-violet-500/6 dark:bg-violet-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center py-20">
          {/* Left — text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Availability badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40">
                <Circle size={6} className="fill-emerald-500 text-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  {personal.availabilityText}
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 font-medium tracking-wide uppercase">
                <MapPin size={14} />
                {personal.location}
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.05]">
                {personal.firstName}{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  {personal.lastName}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 font-medium">
                {personal.title}
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed max-w-lg"
            >
              {personal.tagline}
            </motion.p>

            {/* Bio short */}
            <motion.p
              variants={itemVariants}
              className="text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg text-sm"
            >
              {personal.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <button
                onClick={() => handleNav("#projects")}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-200 shadow-lg shadow-indigo-500/20"
              >
                View My Work
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
              <button
                onClick={() => handleNav("#contact")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all duration-200"
              >
                <Mail size={16} />
                Contact Me
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex items-center gap-1">
              <span className="text-xs text-zinc-400 dark:text-zinc-500 mr-2 font-medium">Find me on</span>
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — avatar / visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Decorative ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full border border-dashed border-indigo-200 dark:border-indigo-800/40 animate-[spin_30s_linear_infinite]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full border border-zinc-200 dark:border-zinc-800/60 opacity-50" />
            </div>

            {/* Avatar */}
            <div className="relative w-72 h-72 lg:w-80 lg:h-80">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10 dark:from-indigo-500/15 dark:to-violet-500/10 blur-2xl scale-110" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white dark:border-zinc-800 shadow-2xl shadow-zinc-900/10 dark:shadow-zinc-900/60">
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge — experience */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -right-6 top-8 bg-white dark:bg-zinc-900 rounded-2xl px-4 py-2.5 shadow-xl border border-zinc-100 dark:border-zinc-800"
              >
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">5+</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Years Exp.</p>
              </motion.div>

              {/* Floating badge — projects */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -left-6 bottom-12 bg-white dark:bg-zinc-900 rounded-2xl px-4 py-2.5 shadow-xl border border-zinc-100 dark:border-zinc-800"
              >
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">20+</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Projects Done</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center pb-8"
        >
          <button
            onClick={() => handleNav("#about")}
            className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-600 hover:text-indigo-500 transition-colors"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
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
