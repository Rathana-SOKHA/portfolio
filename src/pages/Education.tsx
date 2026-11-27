import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { education } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Education() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="education" className="py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12" ref={ref}>
        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            {t("education.badge", "Education")}
          </span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t("education.heading", "Academic background.")}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 lg:-translate-x-px" />

          <div className="space-y-12">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 ${
                  i % 2 === 0 ? "" : "lg:[&>*:first-child]:order-last"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 lg:left-1/2 w-3 h-3 rounded-full bg-indigo-600 dark:bg-indigo-500 border-2 border-white dark:border-zinc-950 -translate-x-1.5 lg:-translate-x-1.5 mt-6" />

                {/* Date side */}
                <div
                  className={`pl-14 lg:pl-0 ${
                    i % 2 === 0 ? "lg:text-right lg:pr-10" : "lg:pl-10"
                  }`}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-800/40 mb-3">
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {edu.start} — {edu.end}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {edu.description}
                  </p>
                </div>

                {/* Content side */}
                <div
                  className={`pl-14 lg:pl-0 ${
                    i % 2 === 0 ? "lg:pl-10" : "lg:pr-10"
                  }`}
                >
                  <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-2xl shrink-0">
                        {edu.logo}
                      </div>
                      <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {edu.institution}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          {edu.degree} · {edu.field}
                        </p>
                        {edu.gpa && (
                          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                    </div>

                    {edu.achievements.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.map((ach) => (
                          <span
                            key={ach}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40"
                          >
                            {ach}
                          </span>
                        ))}
                      </div>
                    )}
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
