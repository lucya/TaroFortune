import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { TarotCard } from "@shared/schema";
import { getLocalizedCard, type Language } from "@/data";

// Position 타입 및 설정 정의
export type PositionKey = "past" | "present" | "future";

interface PositionConfig {
  icon: string;
  color: string;
  translationKey: string;
}

export const POSITION_CONFIG: Record<PositionKey, PositionConfig> = {
  past: {
    icon: "fas fa-history",
    color: "text-purple-300",
    translationKey: "positions.past",
  },
  present: {
    icon: "fas fa-clock",
    color: "text-yellow-300",
    translationKey: "positions.present",
  },
  future: {
    icon: "fas fa-crystal-ball",
    color: "text-blue-300",
    translationKey: "positions.future",
  },
};

interface TarotCardProps {
  card: TarotCard;
  position: PositionKey;
  index: number;
  onClick: () => void;
}

export default function TarotCard({
  card,
  position,
  index,
  onClick,
}: TarotCardProps) {
  const { t, i18n } = useTranslation();

  // 현재 언어에 따라 카드 데이터 가져오기
  const localizedCard =
    getLocalizedCard(card.id, i18n.language as Language) || card;

  // position 설정 가져오기
  const positionConfig = POSITION_CONFIG[position];
  const translatedPosition = t(positionConfig.translationKey);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="group cursor-pointer"
      onClick={onClick}>
      <div className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 backdrop-blur-lg rounded-2xl p-6 border border-purple-600/30 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:border-purple-400/50">
        <div className="text-center mb-4">
          <i
            className={`${positionConfig.icon} text-2xl ${positionConfig.color} mb-2`}></i>
          <h4 className="font-serif text-lg font-semibold text-purple-200">
            {translatedPosition}
          </h4>
        </div>

        <div className="relative bg-gradient-to-br from-purple-700 to-purple-800 rounded-xl p-4 mb-4 border border-purple-500/30 min-h-[240px] flex items-center justify-center overflow-hidden">
          {localizedCard.imageUrl ? (
            /* Card Image */
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <img
                src={localizedCard.imageUrl}
                alt={localizedCard.name}
                className="max-w-full max-h-full object-contain rounded-lg"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))",
                }}
              />
            </div>
          ) : (
            /* Fallback mystical design */
            <>
              {/* Mystical background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0 bg-repeat"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><g fill='%23ffffff' fill-opacity='0.1'><circle cx='30' cy='30' r='1'/><circle cx='15' cy='15' r='0.5'/><circle cx='45' cy='45' r='0.5'/></g></g></svg>")`,
                  }}
                />
              </div>

              {/* Card back design */}
              <div className="relative z-10 text-center text-purple-200">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="mb-4">
                  <i className="fas fa-infinity text-4xl opacity-80"></i>
                </motion.div>
                <div className="font-serif text-xs opacity-60 tracking-widest">
                  TAROT
                </div>
                <div className="mt-2 text-xs opacity-40">✦ ✧ ✦</div>
              </div>

              {/* Mystical glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl animate-pulse" />
            </>
          )}
        </div>

        <div className="text-center">
          <h5 className="font-serif text-xl font-bold text-purple-200 mb-2">
            {localizedCard.name}
          </h5>
          <div className="flex flex-wrap gap-1 justify-center mb-4">
            {localizedCard.keywords.slice(0, 3).map((keyword, i) => (
              <span
                key={i}
                className="bg-purple-600/50 text-purple-100 px-2 py-1 rounded-full text-xs">
                {keyword}
              </span>
            ))}
          </div>
          <button className="text-purple-300 hover:text-purple-200 text-sm font-medium transition-colors duration-200">
            <i className="fas fa-eye mr-1"></i>
            {t("card.seeDetails")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
