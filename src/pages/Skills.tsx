import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Server, Code2, Layers, Database, Palette } from "lucide-react";
import { useTranslation } from "react-i18next";
import { skills } from "../data";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Monitor,
  Server,
  Code2,
  Layers,
  Database,
  Palette,
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function SkillBar({ name, level, inView }: { name: string; level: number; inView: boolean }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{name}</span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
        />
      </div>
    </div>
  );
}

function SkillCard({
  category,
  icon,
  items,
  index,
  inView,
}: {
  category: string;
  icon: string;
  items: { name: string; level: number }[];
  index: number;
  inView: boolean;
}) {
  const Icon = iconMap[icon];
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-900/50 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/15 transition-colors">
          {Icon && <Icon size={18} className="text-indigo-600 dark:text-indigo-400" />}
        </div>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">{category}</h3>
      </div>
      <div className="space-y-4">
        {items.map((skill) => (
          <SkillBar key={skill.name} {...skill} inView={inView} />
        ))}
      </div>
    </motion.div>
  );
}

// Proficiency legend labels
const levels = [
  { label: "Familiar", range: "< 60%" },
  { label: "Proficient", range: "60–79%" },
  { label: "Advanced", range: "80–89%" },
  { label: "Expert", range: "90%+" },
];

export default function Skills() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="skills" className="py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12" ref={ref}>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              {t("skills.badge", "Skills & Technologies")}
            </span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {t("skills.heading", "Tools & technologies I work with.")}
            </h2>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-wrap gap-4"
          >
            {levels.map(({ label, range }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500/60 dark:bg-indigo-400/60" />
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {label} <span className="text-zinc-300 dark:text-zinc-600">·</span> {range}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skillGroup, i) => (
            <SkillCard key={skillGroup.category} {...skillGroup} index={i + 2} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
