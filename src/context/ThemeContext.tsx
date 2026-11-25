import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (event?: React.MouseEvent | MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem("portfolio-theme") as Theme | null;
    if (stored === "dark" || stored === "light") return stored;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  } catch {}
  return "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    root.setAttribute("data-theme", "dark");
  } else {
    root.classList.remove("dark");
    root.setAttribute("data-theme", "light");
  }
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch {}
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Apply theme on initial load
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Also apply immediately on mount
  useEffect(() => {
    applyTheme(theme);
  }, []);

  const toggleTheme = (event?: React.MouseEvent | MouseEvent) => {
    const next: Theme = theme === "light" ? "dark" : "light";

    // Fallback if View Transitions API is not supported or user prefers reduced motion
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (
      typeof document === "undefined" ||
      !("startViewTransition" in document) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyTheme(next);
      setTheme(next);
      return;
    }

    let x = window.innerWidth / 2;
    let y = 0;

    if (event && "clientX" in event) {
      x = event.clientX;
      y = event.clientY;
    } else {
      const toggleEl = document.querySelector("[data-theme-toggle]");
      if (toggleEl) {
        const rect = toggleEl.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transition = (document as any).startViewTransition(() => {
      applyTheme(next);
      setTheme(next);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath,
        },
        {
          duration: 480,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
