import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ko" ? "en" : "ko";
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 shadow-lg border border-purple-400/50 backdrop-blur-lg">
      <div className="flex items-center space-x-2">
        <i className="fas fa-globe text-sm"></i>
        <span className="text-sm">
          {i18n.language === "ko" ? "English" : "한국어"}
        </span>
      </div>
    </motion.button>
  );
}
