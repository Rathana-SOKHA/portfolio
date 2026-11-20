import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { experience } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const typeColors: Record<string, string> = {
  "Full-time": "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800/40",
  Contract: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-800/40",
  Freelance: "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-100 dark:border-violet-800/40",
};

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 lg:py-32 bg-zinc-50/50 dark:bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          custom={0}
          // variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Experience
          </span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Work Experiences.
          </h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-lg">
            Places I've contributed to, roles I've grown through, and teams I've learned from.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8 lg:pl-0">
          {/* Left border line (mobile) */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 lg:hidden" />

          <div className="space-y-6">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="relative"
              >
                {/* Dot (mobile) */}
                <div className="absolute -left-5 top-6 w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-500 border-2 border-white dark:border-zinc-950 lg:hidden" />

                <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-10">
                  {/* Left — meta */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                        {exp.company}
                      </h3>
                      <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">
                        {exp.role}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {exp.start} — {exp.end}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={12} />
                        {exp.type}
                      </span>
                    </div>
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${
                        typeColors[exp.type] || typeColors["Full-time"]
                      }`}
                    >
                      {exp.type}
                    </span>
                  </div>

                  {/* Right — details */}
                  <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    <ul className="space-y-2 mb-5">
                      {exp.responsibilities.map((r, ri) => (
                        <li key={ri} className="flex items-start gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                          <span className="mt-2 w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
