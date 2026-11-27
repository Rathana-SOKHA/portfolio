import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { changeLanguage } from "../i18n";

export function UKFlag({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={`${className} rounded-[3px] shadow-xs object-cover overflow-hidden inline-block shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="uk-clip">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="uk-diag">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath="url(#uk-diag)"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

export function CambodiaFlag({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 480"
      className={`${className} rounded-[3px] shadow-xs object-cover overflow-hidden inline-block shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="640" height="480" fill="#032ea1" />
      <rect width="640" height="240" y="120" fill="#ed1b24" />
      <g fill="#ffffff">
        {/* Main Central Tower */}
        <polygon points="320,165 311,195 329,195" />
        <rect x="312" y="195" width="16" height="52" />
        {/* Flanking Towers */}
        <polygon points="278,200 270,224 286,224" />
        <rect x="272" y="224" width="12" height="23" />
        <polygon points="362,200 354,224 370,224" />
        <rect x="356" y="224" width="12" height="23" />
        {/* Outer Corner Towers */}
        <polygon points="248,218 242,238 254,238" />
        <rect x="243" y="238" width="10" height="19" />
        <polygon points="392,218 386,238 398,238" />
        <rect x="387" y="238" width="10" height="19" />
        {/* Steps / Plinths */}
        <rect x="236" y="247" width="168" height="10" />
        <rect x="224" y="257" width="192" height="12" />
        <rect x="212" y="269" width="216" height="14" />
        <rect x="200" y="283" width="240" height="16" />
      </g>
    </svg>
  );
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("km") ? "km" : "en";

  return (
    <div className="relative flex items-center p-1 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-700/70 select-none shadow-inner h-8">
      {/* English Button */}
      <button
        onClick={() => changeLanguage("en")}
        className={`relative flex items-center justify-center px-2 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
          currentLang === "en" ? "opacity-100 scale-105" : "opacity-55 hover:opacity-100 scale-100"
        }`}
        aria-label="Switch to English"
        title="English"
      >
        {currentLang === "en" && (
          <motion.div
            layoutId="lang-active-pill"
            className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 -z-10"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <UKFlag className="w-5 h-3.5 border border-zinc-200/60 dark:border-zinc-700/60" />
      </button>

      {/* Khmer Button */}
      <button
        onClick={() => changeLanguage("km")}
        className={`relative flex items-center justify-center px-2 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
          currentLang === "km" ? "opacity-100 scale-105" : "opacity-55 hover:opacity-100 scale-100"
        }`}
        aria-label="Switch to Khmer"
        title="ភាសាខ្មែរ (Khmer)"
      >
        {currentLang === "km" && (
          <motion.div
            layoutId="lang-active-pill"
            className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 -z-10"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <CambodiaFlag className="w-5 h-3.5 border border-zinc-200/60 dark:border-zinc-700/60" />
      </button>
    </div>
  );
}
