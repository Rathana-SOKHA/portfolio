"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

type CursorVariant = "default" | "hover" | "click" | "card" | "hidden";

// Interactive selectors that trigger hover expansion
const INTERACTIVE_SELECTORS =
  'a, button, [role="button"], label[for], select, summary, [data-cursor="hover"]';
const CARD_SELECTORS =
  'article, .project-card, [data-cursor="card"]';
const FORM_INPUT_SELECTORS =
  'input, textarea, select, [contenteditable="true"]';

const RING_SPRING = { damping: 25, stiffness: 250, mass: 0.3 };
const DOT_SPRING  = { damping: 45, stiffness: 700, mass: 0.1 };

export default function CustomCursor() {
  const { theme } = useTheme();
  const [isTouchDevice, setIsTouchDevice] = useState(true); // default true to avoid flash on mobile
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isClicking, setIsClicking] = useState(false);

  // Position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, DOT_SPRING);
  const dotY = useSpring(mouseY, DOT_SPRING);

  const ringX = useSpring(mouseX, RING_SPRING);
  const ringY = useSpring(mouseY, RING_SPRING);

  // Detect genuine touch device (smartphones & tablets)
  useEffect(() => {
    const checkTouch = () => {
      const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      setIsTouchDevice(isTouch);
    };
    checkTouch();
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    mq.addEventListener?.("change", checkTouch);
    return () => mq.removeEventListener?.("change", checkTouch);
  }, []);

  const evaluateTarget = useCallback((target: Element | null): CursorVariant => {
    if (!target) return "default";
    if (target.closest(FORM_INPUT_SELECTORS)) return "hidden";
    if (target.closest(INTERACTIVE_SELECTORS)) return "hover";
    if (target.closest(CARD_SELECTORS)) return "card";
    return "default";
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      setVariant(evaluateTarget(e.target as Element));
    };

    const onMouseDown = () => {
      setIsClicking(true);
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    const onWindowBlur = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [isTouchDevice, isVisible, mouseX, mouseY, evaluateTarget]);

  if (isTouchDevice) return null;

  const isDark = theme === "dark";

  // Size and styling configuration for the outer ring
  const ringConfig = {
    default: {
      size: 32,
      borderColor: isDark ? "rgba(129, 140, 248, 0.55)" : "rgba(79, 70, 229, 0.45)",
      backgroundColor: "transparent",
      scale: isClicking ? 0.8 : 1,
      opacity: 1,
    },
    hover: {
      size: 48,
      borderColor: isDark ? "rgba(129, 140, 248, 0.9)" : "rgba(79, 70, 229, 0.85)",
      backgroundColor: isDark ? "rgba(99, 102, 241, 0.12)" : "rgba(79, 70, 229, 0.08)",
      scale: isClicking ? 0.9 : 1,
      opacity: 1,
    },
    click: {
      size: 28,
      borderColor: isDark ? "rgba(129, 140, 248, 0.9)" : "rgba(79, 70, 229, 0.85)",
      backgroundColor: isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(79, 70, 229, 0.15)",
      scale: 0.85,
      opacity: 1,
    },
    card: {
      size: 56,
      borderColor: isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)",
      backgroundColor: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)",
      scale: isClicking ? 0.9 : 1,
      opacity: 1,
    },
    hidden: {
      size: 16,
      borderColor: "transparent",
      backgroundColor: "transparent",
      scale: 0.5,
      opacity: 0,
    },
  }[variant];

  const dotVisible = isVisible && variant !== "hidden";

  return (
    <>
      {/* Outer Spring Ring */}
      <AnimatePresence>
        {isVisible && variant !== "hidden" && (
          <motion.div
            key="cursor-ring"
            className="fixed top-0 left-0 pointer-events-none z-[99999] select-none"
            style={{
              x: ringX,
              y: ringY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: ringConfig.opacity, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              animate={{
                width: ringConfig.size,
                height: ringConfig.size,
                borderColor: ringConfig.borderColor,
                backgroundColor: ringConfig.backgroundColor,
                scale: ringConfig.scale,
              }}
              transition={{
                type: "spring",
                damping: 22,
                stiffness: 300,
                mass: 0.2,
              }}
              className="rounded-full border-[1.5px]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inner Dot */}
      <AnimatePresence>
        {dotVisible && (
          <motion.div
            key="cursor-dot"
            className="fixed top-0 left-0 pointer-events-none z-[99999] select-none"
            style={{
              x: dotX,
              y: dotY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.12 }}
          >
            <motion.div
              animate={{
                width: isClicking ? 4 : 6,
                height: isClicking ? 4 : 6,
                backgroundColor:
                  variant === "hover"
                    ? isDark ? "#a5b4fc" : "#4f46e5"
                    : isDark ? "#ffffff" : "#18181b",
                scale: isClicking ? 1.4 : 1,
              }}
              transition={{ type: "spring", damping: 30, stiffness: 600 }}
              className="rounded-full shadow-sm"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
