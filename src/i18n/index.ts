import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import koTranslation from "./locales/ko.json";
import enTranslation from "./locales/en.json";

const resources = {
  ko: {
    translation: koTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko", // 기본 언어
  fallbackLng: "ko",

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },
});

export default i18n;
