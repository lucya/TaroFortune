import { motion, AnimatePresence } from "framer-motion";
import type { TarotCard } from "@shared/schema";

interface CardModalProps {
  card: TarotCard | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CardModal({ card, isOpen, onClose }: CardModalProps) {
  if (!card) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-600/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-2xl font-bold text-purple-200">
                {card.name} ({card.englishName})
              </h3>
              <button
                onClick={onClose}
                className="text-purple-300 hover:text-white text-2xl transition-colors duration-200"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Card Image */}
              <div className="bg-gradient-to-br from-purple-700 to-purple-800 rounded-xl p-6 border border-purple-500/30 text-center">
                <div className="w-48 h-72 mx-auto bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                  {card.imageUrl ? (
                    <img 
                      src={card.imageUrl} 
                      alt={card.name}
                      className="w-full h-full object-contain rounded-lg"
                      style={{ filter: 'drop-shadow(0 0 15px rgba(139, 92, 246, 0.7))' }}
                    />
                  ) : (
                    <div className="text-center text-purple-200">
                      <i className="fas fa-infinity text-6xl mb-4 opacity-80"></i>
                      <div className="font-serif text-sm opacity-60 tracking-widest">TAROT</div>
                    </div>
                  )}
                </div>
                <span className="bg-purple-600/50 text-purple-100 px-3 py-1 rounded-full text-sm">
                  {card.type}
                </span>
              </div>
              
              {/* Keywords */}
              <div>
                <h4 className="font-serif text-lg font-bold text-purple-200 mb-3 flex items-center">
                  <i className="fas fa-tags mr-2 text-purple-300"></i>핵심 키워드
                </h4>
                <div className="flex flex-wrap gap-2">
                  {card.keywords.map((keyword, i) => (
                    <span key={i} className="bg-purple-600/40 text-purple-100 px-3 py-1 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Detailed Information */}
              <div className="grid gap-4">
                <div className="bg-purple-800/40 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-300 mb-2 flex items-center">
                    <i className="fas fa-heart text-red-400 mr-2"></i>애정운
                  </h5>
                  <p className="text-purple-100 text-sm leading-relaxed">{card.love}</p>
                </div>
                
                <div className="bg-purple-800/40 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-300 mb-2 flex items-center">
                    <i className="fas fa-users text-blue-400 mr-2"></i>관계운
                  </h5>
                  <p className="text-purple-100 text-sm leading-relaxed">{card.relationship}</p>
                </div>
                
                <div className="bg-purple-800/40 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-300 mb-2 flex items-center">
                    <i className="fas fa-coins text-yellow-400 mr-2"></i>금전운
                  </h5>
                  <p className="text-purple-100 text-sm leading-relaxed">{card.money}</p>
                </div>
                
                <div className="bg-purple-800/40 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-300 mb-2 flex items-center">
                    <i className="fas fa-briefcase text-green-400 mr-2"></i>직업/사업운
                  </h5>
                  <p className="text-purple-100 text-sm leading-relaxed">{card.career}</p>
                </div>
              </div>
              
              {/* Advice */}
              <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 rounded-lg p-4">
                <h5 className="font-semibold text-purple-200 mb-2 flex items-center">
                  <i className="fas fa-lightbulb text-yellow-300 mr-2"></i>조언의 메시지
                </h5>
                <p className="text-purple-100 text-sm leading-relaxed">{card.advice}</p>
              </div>
              
              {/* Warning */}
              {card.warning && (
                <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg p-4 border border-red-500/20">
                  <h5 className="font-semibold text-red-300 mb-2 flex items-center">
                    <i className="fas fa-exclamation-triangle text-red-400 mr-2"></i>주의할 점
                  </h5>
                  <p className="text-red-100 text-sm leading-relaxed">{card.warning}</p>
                </div>
              )}
              
              {/* Description */}
              {card.description && (
                <div className="bg-purple-800/30 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-300 mb-2 flex items-center">
                    <i className="fas fa-scroll text-purple-400 mr-2"></i>카드 설명
                  </h5>
                  <p className="text-purple-100 text-sm leading-relaxed">{card.description}</p>
                </div>
              )}
              
              {/* Close Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={onClose}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                >
                  <i className="fas fa-times mr-2"></i>닫기
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
