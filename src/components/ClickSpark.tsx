/**
 * ClickSpark — tiny radial ripple on mouse click for interactive elements.
 * Rendered as a single canvas overlay — zero DOM nodes per click.
 */
import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  t: number;      // birth timestamp
  color: string;
}

const DURATION  = 500;   // ms
const PARTICLES = 6;
const RADIUS    = 32;

export default function ClickSpark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparks    = useRef<Spark[]>([]);
  const rafId     = useRef<number>(0);
  const dark      = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Track theme via class
    const obs = new MutationObserver(() => {
      dark.current = document.documentElement.classList.contains("dark");
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    dark.current = document.documentElement.classList.contains("dark");

    // ── Click handler ───────────────────────────────────────────────────
    const onClick = (e: MouseEvent) => {
      // Only spark on interactive elements
      const el = e.target as Element;
      const interactive = el.closest('a, button, [role="button"], input, label');
      if (!interactive) return;

      const color = dark.current
        ? `hsl(${235 + Math.random() * 20}, 80%, 70%)`
        : `hsl(${235 + Math.random() * 20}, 72%, 55%)`;

      sparks.current.push({ x: e.clientX, y: e.clientY, t: performance.now(), color });
    };

    document.addEventListener("click", onClick);

    // ── Draw loop ───────────────────────────────────────────────────────
    const draw = (now: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparks.current = sparks.current.filter((s) => {
        const age      = now - s.t;
        if (age > DURATION) return false;

        const progress = age / DURATION;        // 0→1
        const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const alpha    = 1 - progress;

        for (let i = 0; i < PARTICLES; i++) {
          const angle = (i / PARTICLES) * Math.PI * 2;
          const dist  = eased * RADIUS;
          const px    = s.x + Math.cos(angle) * dist;
          const py    = s.y + Math.sin(angle) * dist;
          const size  = (1 - progress) * 3.5;

          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = s.color
            .replace(")", `, ${alpha})`)
            .replace("hsl(", "hsla(");
          ctx.fill();
        }
        return true;
      });

      rafId.current = requestAnimationFrame(draw);
    };
    rafId.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId.current);
      obs.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9997] pointer-events-none select-none"
      aria-hidden="true"
    />
  );
}
