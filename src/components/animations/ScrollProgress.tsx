import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const raw    = useMotionValue(0);
  const smooth = useSpring(raw, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      raw.set(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [raw]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9998] h-[2px] origin-left
                 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400
                 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-300
                 pointer-events-none"
      style={{ scaleX: smooth }}
    />
  );
}
