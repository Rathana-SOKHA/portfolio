import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import km from "./locales/km.json";

export const defaultNS = "translation";
export const resources = {
  en: { translation: en },
  km: { translation: km },
} as const;

export type Language = "en" | "km";

const savedLang = (typeof localStorage !== "undefined" && localStorage.getItem("portfolio-lang")) as Language | null;
const initialLang: Language = savedLang === "km" || savedLang === "en" ? savedLang : "en";

i18n.use(initReactI18next).init({
  resources,
  lng: initialLang,
  fallbackLng: "en",
  defaultNS,
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export const changeLanguage = (lang: Language) => {
  i18n.changeLanguage(lang);
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("portfolio-lang", lang);
  }
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang;
  }
};

export default i18n;
