import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { TarotCard } from "@shared/schema";

interface TarotCardProps {
  card: TarotCard;
  position: string;
  index: number;
  onClick: () => void;
}

const getPositionIcon = (position: string) => {
  if (position.includes("과거") || position.includes("Past"))
    return "fas fa-history";
  if (position.includes("현재") || position.includes("Present"))
    return "fas fa-clock";
  if (position.includes("미래") || position.includes("Future"))
    return "fas fa-crystal-ball";
  return "fas fa-clock";
};

const getPositionColor = (position: string) => {
  if (position.includes("과거") || position.includes("Past"))
    return "text-purple-300";
  if (position.includes("현재") || position.includes("Present"))
    return "text-yellow-300";
  if (position.includes("미래") || position.includes("Future"))
    return "text-blue-300";
  return "text-yellow-300";
};

export default function TarotCard({
  card,
  position,
  index,
  onClick,
}: TarotCardProps) {
  const { t, i18n } = useTranslation();

  // 현재 언어에 따라 카드 이름 결정
  const getCardName = () => {
    return i18n.language === "en" ? card.englishName : card.name;
  };

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
            className={`${getPositionIcon(
              position
            )} text-2xl ${getPositionColor(position)} mb-2`}></i>
          <h4 className="font-serif text-lg font-semibold text-purple-200">
            {position}
          </h4>
        </div>

        <div className="relative bg-gradient-to-br from-purple-700 to-purple-800 rounded-xl p-4 mb-4 border border-purple-500/30 min-h-[240px] flex items-center justify-center overflow-hidden">
          {card.imageUrl ? (
            /* Card Image */
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <img
                src={card.imageUrl}
                alt={card.name}
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
            {getCardName()}
          </h5>
          {/* 부제목으로 다른 언어 이름 표시 */}
          <p className="text-purple-300 text-sm mb-3">
            {i18n.language === "en" ? card.name : card.englishName}
          </p>
          <div className="flex flex-wrap gap-1 justify-center mb-4">
            {card.keywords.slice(0, 3).map((keyword, i) => (
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
