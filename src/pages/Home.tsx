import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { TarotCard } from "@shared/schema";
import { getRandomCards } from "@/data/tarotCards";
import TarotCardComponent from "@/components/TarotCard";
import CardModal from "@/components/CardModal";
import ReadingResults from "@/components/ReadingResults";

export default function Home() {
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const saveReadingMutation = useMutation({
    mutationFn: async (readingData: { cards: number[]; interpretation: string }) => {
      return apiRequest("POST", "/api/readings", readingData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/readings"] });
    },
  });

  const handleDrawCards = () => {
    const cards = getRandomCards(3);
    setDrawnCards(cards);
    setShowResults(true);
    
    // Save reading to backend
    const readingData = {
      cards: cards.map(card => card.id),
      interpretation: generateInterpretation(cards),
      readingType: "past-present-future"
    };
    
    saveReadingMutation.mutate(readingData);
  };

  const generateInterpretation = (cards: TarotCard[]) => {
    const positions = ["과거", "현재", "미래"];
    return positions.map((position, index) => {
      const card = cards[index];
      return `${position}: ${card.name} - ${card.keywords.slice(0, 3).join(', ')}`;
    }).join('\n');
  };

  const handleCardClick = (card: TarotCard) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };



  const resetReading = () => {
    setDrawnCards([]);
    setShowResults(false);
    setSelectedCard(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-800 text-white overflow-x-hidden">
      {/* Mystical Background Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><g fill='%23ffffff' fill-opacity='0.1'><circle cx='30' cy='30' r='1'/><circle cx='15' cy='15' r='0.5'/><circle cx='45' cy='45' r='0.5'/></g></g></svg>")`
        }} />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-300 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 text-center py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-serif text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-300 bg-clip-text text-transparent mb-4"
          >
            <i className="fas fa-moon mr-4"></i>
            신비로운 타로 운세
            <i className="fas fa-star ml-4"></i>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-purple-100 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            3장의 타로카드가 당신의 과거, 현재, 미래를 말해드립니다.<br/>
            <span className="text-yellow-300 font-medium">마음을 비우고 카드를 선택해보세요</span>
          </motion.p>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
        
        {!showResults ? (
          /* Card Drawing Section */
          <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-purple-600/30 shadow-2xl">
              <div className="mb-8">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-purple-200 mb-4">
                  운명의 카드를 뽑아보세요
                </h2>
                <p className="text-purple-100/80 mb-8">
                  마음 속 질문을 떠올리며 아래 버튼을 클릭하세요
                </p>
              </div>

              {/* Card Deck Visualization */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-32 h-48 bg-gradient-to-br from-purple-800 to-purple-950 rounded-xl border-2 border-purple-300 shadow-lg transform rotate-3"
                  />
                  <motion.div
                    animate={{ rotate: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="w-32 h-48 bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl border-2 border-purple-300 shadow-lg absolute top-0 left-0 transform rotate-1"
                  />
                  <motion.div
                    animate={{ rotate: [0, 2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="w-32 h-48 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl border-2 border-purple-300 shadow-lg absolute top-0 left-0 flex items-center justify-center"
                  >
                    <motion.i
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="fas fa-infinity text-4xl text-purple-200"
                    />
                  </motion.div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDrawCards}
                disabled={saveReadingMutation.isPending}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg border border-purple-400/50 disabled:opacity-50"
              >
                <i className="fas fa-magic mr-3"></i>
                {saveReadingMutation.isPending ? "카드를 뽑는 중..." : "3장의 카드 뽑기"}
              </motion.button>
            </div>
          </motion.section>
        ) : (
          /* Drawn Cards Section */
          <section>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-purple-200 mb-4">
                당신의 운명이 펼쳐집니다
              </h2>
              <div className="flex justify-center space-x-8 text-purple-300 font-medium">
                <span className="text-center">
                  <i className="fas fa-history block text-2xl mb-2"></i>
                  과거
                </span>
                <span className="text-center">
                  <i className="fas fa-clock block text-2xl mb-2"></i>
                  현재
                </span>
                <span className="text-center">
                  <i className="fas fa-crystal-ball block text-2xl mb-2"></i>
                  미래
                </span>
              </div>
            </motion.div>

            {/* Cards Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {drawnCards.map((card, index) => (
                <TarotCardComponent
                  key={card.id}
                  card={card}
                  position={["과거", "현재", "미래"][index] as "과거" | "현재" | "미래"}
                  index={index}
                  onClick={() => handleCardClick(card)}
                />
              ))}
            </div>

            {/* Reading Results */}
            <ReadingResults
              cards={drawnCards}
              onDrawAgain={resetReading}
            />
          </section>
        )}
      </main>

      {/* Card Detail Modal */}
      <CardModal
        card={selectedCard}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
