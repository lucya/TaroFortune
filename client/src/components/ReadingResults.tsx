import { motion } from "framer-motion";
import type { TarotCard } from "@shared/schema";

interface ReadingResultsProps {
  cards: TarotCard[];
  onDrawAgain: () => void;
}

const positions = ["과거", "현재", "미래"];
const positionIcons = ["fas fa-history", "fas fa-clock", "fas fa-crystal-ball"];
const positionColors = ["text-purple-300", "text-yellow-300", "text-blue-300"];

export default function ReadingResults({ cards, onDrawAgain }: ReadingResultsProps) {
  const generatePositionMeaning = (card: TarotCard, position: string) => {
    const meanings = {
      '과거': `과거의 ${card.name} 카드는 ${card.keywords.slice(0, 3).join(', ')}의 영향을 받았음을 나타냅니다. 이는 현재 상황의 뿌리가 되는 경험이나 교훈을 의미합니다.`,
      '현재': `현재의 ${card.name} 카드는 지금 당신이 ${card.keywords.slice(0, 3).join(', ')}의 상태에 있음을 보여줍니다. ${card.advice}`,
      '미래': `미래의 ${card.name} 카드는 앞으로 ${card.keywords.slice(0, 3).join(', ')}의 기운이 다가올 것임을 암시합니다. 미래를 위한 준비와 마음가짐이 중요합니다.`
    };
    return meanings[position as keyof typeof meanings] || `${card.name} 카드가 ${position}에 나타났습니다.`;
  };

  const generateOverallReading = (cards: TarotCard[]) => {
    const overallKeywords = cards.flatMap(card => card.keywords.slice(0, 2));
    const uniqueKeywords = Array.from(new Set(overallKeywords)).slice(0, 5);
    
    return `당신의 타로 리딩은 ${uniqueKeywords.join(', ')}의 에너지를 보여줍니다. 
            과거의 경험이 현재에 영향을 미치고 있으며, 이는 미래의 새로운 가능성으로 이어질 것입니다. 
            각 카드의 메시지를 마음에 새기고, 직감을 믿으며 앞으로 나아가세요.`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-purple-600/30 shadow-2xl"
    >
      <h3 className="font-serif text-2xl md:text-3xl font-bold text-purple-200 mb-8 text-center">
        <i className="fas fa-scroll mr-3"></i>
        타로 해석
      </h3>
      
      <div className="space-y-8">
        {positions.map((position, index) => {
          const card = cards[index];
          return (
            <motion.div
              key={position}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              className="border-l-4 border-purple-400 pl-6 py-4"
            >
              <div className="flex items-center mb-3">
                <i className={`${positionIcons[index]} ${positionColors[index]} text-xl mr-3`}></i>
                <h4 className="font-serif text-xl font-bold text-purple-200">
                  {position}: {card.name}
                </h4>
              </div>
              <p className="text-purple-100 leading-relaxed mb-3">
                {generatePositionMeaning(card, position)}
              </p>
              <div className="bg-purple-800/40 rounded-lg p-4">
                <h5 className="font-semibold text-purple-300 mb-2">핵심 키워드</h5>
                <div className="flex flex-wrap gap-2">
                  {card.keywords.slice(0, 4).map((keyword, i) => (
                    <span key={i} className="bg-purple-600/30 text-purple-200 px-3 py-1 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
        
        {/* Overall Reading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="bg-gradient-to-r from-purple-800/50 to-purple-700/50 rounded-xl p-6 border border-purple-500/30"
        >
          <h4 className="font-serif text-xl font-bold text-purple-200 mb-4 text-center">
            <i className="fas fa-stars mr-2"></i>종합 운세<i className="fas fa-stars ml-2"></i>
          </h4>
          <p className="text-purple-100 leading-relaxed text-center">
            {generateOverallReading(cards)}
          </p>
        </motion.div>
      </div>
      
      {/* Action Buttons */}
      <div className="text-center mt-12">
        <button
          onClick={onDrawAgain}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg border border-purple-400/50"
        >
          <i className="fas fa-redo mr-2"></i>
          다시 뽑기
        </button>
      </div>
    </motion.div>
  );
}
