import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Briefcase, GraduationCap, User, FolderGit2, ChevronDown, Lock, Globe } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { projects, type ProjectCategory } from "../data";

const categories: ProjectCategory[] = [
  "All",
  "Company Project",
  "School Project",
  "Personal Project",
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function getCategoryIcon(cat: ProjectCategory, size = 13) {
  switch (cat) {
    case "Company Project":
      return <Briefcase size={size} />;
    case "School Project":
      return <GraduationCap size={size} />;
    case "Personal Project":
      return <User size={size} />;
    default:
      return <FolderGit2 size={size} />;
  }
}

function getCategoryBadgeClass(cat: ProjectCategory) {
  switch (cat) {
    case "Company Project":
      return "bg-blue-50/90 text-blue-700 border-blue-200/60 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-800/60";
    case "School Project":
      return "bg-emerald-50/90 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800/60";
    case "Personal Project":
      return "bg-purple-50/90 text-purple-700 border-purple-200/60 dark:bg-purple-950/80 dark:text-purple-300 dark:border-purple-800/60";
    default:
      return "bg-zinc-50/90 text-zinc-700 border-zinc-200/60 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-700/60";
  }
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:shadow-zinc-900/8 dark:hover:shadow-zinc-900/60 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-zinc-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover action buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-zinc-900 text-sm font-medium shadow-lg hover:bg-indigo-50 transition-colors"
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
          {project.visibility === "Private" && project.githubUrl === "#" ? (
            <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 backdrop-blur-sm text-zinc-300 text-sm font-medium">
              <Lock size={13} className="text-amber-400" />
              Private Code
            </span>
          ) : (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 backdrop-blur-sm text-white text-sm font-medium hover:bg-zinc-900 transition-colors"
            >
              <GithubIcon size={14} />
              Code
            </a>
          )}
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border shadow-sm ${getCategoryBadgeClass(
              project.category
            )}`}
          >
            {getCategoryIcon(project.category, 12)}
            {project.category}
          </span>
        </div>

        {/* Public / Private badge */}
        <div className="absolute top-3 right-3">
          {project.visibility === "Private" ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/85 text-zinc-100 border border-zinc-700/60 backdrop-blur-md text-xs font-medium shadow-sm">
              <Lock size={11} className="text-amber-400 stroke-[2.2]" />
              <span>Private</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-600/90 text-white border border-emerald-500/30 backdrop-blur-md text-xs font-medium shadow-sm">
              <Globe size={11} className="text-emerald-100 stroke-[2.2]" />
              <span>Public</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-700/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [active, setActive] = useState<ProjectCategory>("All");
  const [showAll, setShowAll] = useState(false);

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  const INITIAL_COUNT = 6;
  const hasMore = filtered.length > INITIAL_COUNT;
  const displayedProjects = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <section id="projects" className="py-24 lg:py-32 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12" ref={ref}>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Projects
            </span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Selected work.
            </h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-md">
              A curated selection of projects across company, school, and personal initiatives.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;
              const isActive = active === cat;

              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActive(cat);
                    setShowAll(false);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm shadow-indigo-500/20"
                      : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                >
                  {getCategoryIcon(cat, 14)}
                  <span>{cat}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Projects grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} inView={inView} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-12 flex justify-center"
          >
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium text-sm shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 cursor-pointer group"
            >
              <span>
                {showAll
                  ? "Show Less"
                  : `View All Projects (${filtered.length})`}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  showAll ? "rotate-180" : "group-hover:translate-y-0.5"
                }`}
              />
            </button>
          </motion.div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-24 text-zinc-400 dark:text-zinc-600">
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
