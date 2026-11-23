import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Star, Maximize2, X } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { projects, type ProjectCategory } from "../data";

const categories: ProjectCategory[] = ["All", "Web App", "Mobile", "Open Source", "Design"];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ProjectCard({
  project,
  index,
  inView,
  onPreview,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
  onPreview: (project: (typeof projects)[0]) => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:shadow-zinc-900/8 dark:hover:shadow-zinc-900/60 transition-all duration-500 flex flex-col"
    >
      {/* Image container - fitted with object-contain so full image is visible */}
      <div
        className="relative overflow-hidden aspect-[16/10] bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center cursor-pointer group/img"
        onClick={() => onPreview(project)}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-contain p-1.5 transition-transform duration-500 group-hover/img:scale-[1.02]"
        />

        {/* Hover backdrop overlay */}
        <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover action buttons */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 px-3 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => onPreview(project)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-zinc-900 text-xs font-semibold shadow-lg hover:bg-indigo-50 transition-colors"
            title="View full image"
          >
            <Maximize2 size={13} />
            Full Image
          </button>

          {project.liveUrl && project.liveUrl !== "#" ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-zinc-900 text-xs font-semibold shadow-lg hover:bg-indigo-50 transition-colors"
            >
              <ExternalLink size={13} />
              Demo
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onPreview(project)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-zinc-900 text-xs font-semibold shadow-lg hover:bg-indigo-50 transition-colors"
            >
              <ExternalLink size={13} />
              Preview
            </button>
          )}

          {project.githubUrl && project.githubUrl !== "#" && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900/90 text-white text-xs font-semibold hover:bg-zinc-900 transition-colors"
            >
              <GithubIcon size={13} />
              Code
            </a>
          )}
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 backdrop-blur-sm shadow-sm">
            {project.category}
          </span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-10 pointer-events-none">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-600 text-white text-xs font-medium shadow-sm">
              <Star size={10} className="fill-current" />
              Featured
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>
        </div>

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
  const [previewProject, setPreviewProject] = useState<(typeof projects)[0] | null>(null);

  // Close preview on Escape key and handle scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewProject(null);
    };
    if (previewProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewProject]);

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

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
              A curated selection of projects that showcase my range and approach.
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
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active === cat
                    ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm shadow-indigo-500/20"
                    : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                inView={inView}
                onPreview={(p) => setPreviewProject(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-zinc-400 dark:text-zinc-600">
            No projects in this category yet.
          </div>
        )}
      </div>

      {/* Full-Screen Image Lightbox Modal */}
      <AnimatePresence>
        {previewProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[92vh] bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col cursor-default"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/40">
                    {previewProject.category}
                  </span>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm sm:text-base">
                    {previewProject.title}
                  </h4>
                </div>
                <button
                  onClick={() => setPreviewProject(null)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Full Image Display Container */}
              <div className="overflow-auto max-h-[calc(92vh-110px)] p-3 sm:p-6 bg-zinc-950/5 dark:bg-zinc-950/70 flex items-center justify-center">
                <img
                  src={previewProject.image}
                  alt={previewProject.title}
                  className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-xl shadow-lg border border-zinc-200/60 dark:border-zinc-800/80"
                />
              </div>

              {/* Modal Bottom Bar with Tags & Links */}
              <div className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <div className="flex flex-wrap gap-1.5">
                  {previewProject.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {previewProject.liveUrl && previewProject.liveUrl !== "#" && (
                    <a
                      href={previewProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                    >
                      <ExternalLink size={12} />
                      Live Site
                    </a>
                  )}
                  {previewProject.githubUrl && previewProject.githubUrl !== "#" && (
                    <a
                      href={previewProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 font-medium hover:underline ml-2"
                    >
                      <GithubIcon size={12} />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
