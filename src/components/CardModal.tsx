import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { TarotCard } from "@shared/schema";
import { getLocalizedCard, type Language } from "@/data";

interface CardModalProps {
  card: TarotCard | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CardModal({ card, isOpen, onClose }: CardModalProps) {
  const { t, i18n } = useTranslation();

  if (!card) return null;

  // 현재 언어에 따라 카드 데이터 가져오기
  const localizedCard =
    getLocalizedCard(card.id, i18n.language as Language) || card;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            className="relative bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-600/30 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-purple-300 hover:text-white transition-colors duration-200 z-10">
              <i className="fas fa-times text-2xl"></i>
            </button>

            {/* Card Header */}
            <div className="text-center mb-8">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-serif text-3xl font-bold text-purple-200 mb-2">
                {localizedCard.name}
              </motion.h2>
            </div>

            <div className="space-y-6">
              {/* Card Image */}
              <div className="bg-gradient-to-br from-purple-700 to-purple-800 rounded-xl p-6 border border-purple-500/30 text-center">
                <div className="w-48 h-72 mx-auto bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                  {localizedCard.imageUrl ? (
                    <img
                      src={localizedCard.imageUrl}
                      alt={localizedCard.name}
                      className="w-full h-full object-contain rounded-lg"
                      style={{
                        filter: "drop-shadow(0 0 15px rgba(139, 92, 246, 0.7))",
                      }}
                    />
                  ) : (
                    <div className="text-center text-purple-200">
                      <i className="fas fa-infinity text-6xl mb-4 opacity-80"></i>
                      <div className="font-serif text-sm opacity-60 tracking-widest">
                        TAROT
                      </div>
                    </div>
                  )}
                </div>
                <span className="bg-purple-600/50 text-purple-100 px-3 py-1 rounded-full text-sm">
                  {localizedCard.type}
                </span>
              </div>

              {/* Keywords */}
              <div>
                <h4 className="font-serif text-lg font-bold text-purple-200 mb-3 flex items-center">
                  <i className="fas fa-tags mr-2 text-purple-300"></i>
                  {t("card.keywords")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {localizedCard.keywords.map((keyword, i) => (
                    <span
                      key={i}
                      className="bg-purple-600/40 text-purple-100 px-3 py-1 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Love Fortune */}
              <div className="bg-purple-800/40 rounded-lg p-4">
                <h4 className="font-serif text-lg font-bold text-purple-200 mb-3 flex items-center">
                  <i className="fas fa-heart mr-2 text-pink-400"></i>
                  {t("card.love")}
                </h4>
                <p className="text-purple-100 leading-relaxed">
                  {localizedCard.love}
                </p>
              </div>

              {/* Relationship Fortune */}
              <div className="bg-purple-800/40 rounded-lg p-4">
                <h4 className="font-serif text-lg font-bold text-purple-200 mb-3 flex items-center">
                  <i className="fas fa-users mr-2 text-blue-400"></i>
                  {t("card.relationship")}
                </h4>
                <p className="text-purple-100 leading-relaxed">
                  {localizedCard.relationship}
                </p>
              </div>

              {/* Money Fortune */}
              <div className="bg-purple-800/40 rounded-lg p-4">
                <h4 className="font-serif text-lg font-bold text-purple-200 mb-3 flex items-center">
                  <i className="fas fa-coins mr-2 text-yellow-400"></i>
                  {t("card.money")}
                </h4>
                <p className="text-purple-100 leading-relaxed">
                  {localizedCard.money}
                </p>
              </div>

              {/* Career Fortune */}
              <div className="bg-purple-800/40 rounded-lg p-4">
                <h4 className="font-serif text-lg font-bold text-purple-200 mb-3 flex items-center">
                  <i className="fas fa-briefcase mr-2 text-green-400"></i>
                  {t("card.career")}
                </h4>
                <p className="text-purple-100 leading-relaxed">
                  {localizedCard.career}
                </p>
              </div>

              {/* Advice */}
              <div className="bg-purple-800/40 rounded-lg p-4">
                <h4 className="font-serif text-lg font-bold text-purple-200 mb-3 flex items-center">
                  <i className="fas fa-lightbulb mr-2 text-orange-400"></i>
                  {t("card.advice")}
                </h4>
                <p className="text-purple-100 leading-relaxed">
                  {localizedCard.advice}
                </p>
              </div>

              {/* Warning */}
              {localizedCard.warning && (
                <div className="bg-orange-900/40 rounded-lg p-4 border border-orange-600/30">
                  <h4 className="font-serif text-lg font-bold text-orange-200 mb-3 flex items-center">
                    <i className="fas fa-exclamation-triangle mr-2 text-orange-400"></i>
                    {t("card.warning")}
                  </h4>
                  <p className="text-orange-100 leading-relaxed">
                    {localizedCard.warning}
                  </p>
                </div>
              )}

              {/* Description */}
              {localizedCard.description && (
                <div className="bg-purple-800/40 rounded-lg p-4">
                  <h4 className="font-serif text-lg font-bold text-purple-200 mb-3 flex items-center">
                    <i className="fas fa-book mr-2 text-purple-300"></i>
                    {t("card.description")}
                  </h4>
                  <p className="text-purple-100 leading-relaxed">
                    {localizedCard.description}
                  </p>
                </div>
              )}
            </div>

            {/* Close Button at Bottom */}
            <div className="text-center mt-8">
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg border border-purple-400/50">
                <i className="fas fa-times mr-2"></i>
                {t("card.closeModal")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
