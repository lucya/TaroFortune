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

// 브라우저 언어 감지 함수
const detectBrowserLanguage = (): string => {
  // 브라우저의 언어 설정을 가져옴
  const browserLang = navigator.language.toLowerCase();

  // 한국어인 경우 (ko, ko-KR 등)
  if (browserLang.startsWith("ko")) {
    return "ko";
  }

  // 영어인 경우 (en, en-US 등) 또는 기타 언어인 경우 영어로 설정
  return "en";
};

const defaultLanguage = detectBrowserLanguage();

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage, // 브라우저 언어에 따른 기본 언어
  fallbackLng: "en", // 지원하지 않는 언어일 경우 영어로 fallback

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },
});

export default i18n;
