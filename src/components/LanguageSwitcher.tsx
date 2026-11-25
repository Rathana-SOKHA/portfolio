import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { changeLanguage } from "../i18n";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith("km") ? "km" : "en");

  return (
    <div className="relative flex items-center p-1 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-700/70 text-xs font-medium select-none shadow-inner">
      <button
        onClick={() => changeLanguage("en")}
        className={`relative px-2.5 py-1 rounded-lg transition-colors duration-200 cursor-pointer ${
          currentLang === "en"
            ? "text-indigo-600 dark:text-indigo-400 font-bold"
            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
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
        <span>EN</span>
      </button>

      <button
        onClick={() => changeLanguage("km")}
        className={`relative px-2.5 py-1 rounded-lg transition-colors duration-200 cursor-pointer ${
          currentLang === "km"
            ? "text-indigo-600 dark:text-indigo-400 font-bold"
            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
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
        <span>ខ្មែរ</span>
      </button>
    </div>
  );
}
