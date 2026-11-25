import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, Coffee, Code2, Globe, Star } from "lucide-react";
import { personal } from "../data";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Coffee,
  Code2,
  Globe,
  Star,
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="about" className="py-24 lg:py-32 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12" ref={ref}>
        {/* Section header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            About Me
          </span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Behind the code.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left — image */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-2"
          >
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src={personal.avatar}
                  alt={personal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Offset border decoration */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border-2 border-indigo-200 dark:border-indigo-800/40 -z-10" />

              {/* Philosophy card */}
              <div className="absolute -bottom-8 left-4 right-16 bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-xl border border-zinc-100 dark:border-zinc-800">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wide mb-1">
                  Philosophy
                </p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed line-clamp-3">
                  {personal.philosophy}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — content */}
          <div className="lg:col-span-3 space-y-8 mt-8 lg:mt-0">
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed"
            >
              {personal.bio}
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-zinc-500 dark:text-zinc-400 leading-relaxed"
            >
              {personal.longBio}
            </motion.p>

            {/* Facts grid */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-4"
            >
              {personal.facts.map((fact) => {
                const Icon = iconMap[fact.icon];
                return (
                  <div
                    key={fact.label}
                    className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      {Icon && <Icon size={16} className="text-indigo-500 dark:text-indigo-400" />}
                      <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        {fact.value}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-tight">
                      {fact.label}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            {/* Info rows */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-3 pt-2"
            >
              {[
                { label: "Name", value: personal.name },
                { label: "Location", value: personal.location },
                { label: "Email", value: personal.email },
                { label: "Status", value: personal.availabilityText },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-baseline gap-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 w-20 shrink-0">
                    {label}
                  </span>
                  <span className="text-zinc-700 dark:text-zinc-300 text-sm font-medium">
                    {value}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <a
                href={personal.cvUrl}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium text-sm hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-all duration-200 shadow-sm"
              >
                <Download size={16} />
                Download CV
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
