import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import type { TarotCard } from "@shared/schema";
import { getRandomCards, type Language } from "@/data";
import TarotCardComponent, { type PositionKey } from "@/components/TarotCard";
import CardModal from "@/components/CardModal";
import ReadingResults from "@/components/ReadingResults";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Home() {
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const { toast } = useToast();
  const { t, i18n } = useTranslation();

  const handleDrawCards = async () => {
    setIsDrawing(true);

    try {
      // 언어별 카드 데이터 사용
      const language = i18n.language as Language;

      // 시뮬레이션을 위한 지연
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 매번 새로운 랜덤 카드를 생성
      const randomCards = getRandomCards(3, language);

      setDrawnCards(randomCards);
      setShowResults(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "카드를 뽑는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsDrawing(false);
    }
  };

  const generateInterpretation = (cards: TarotCard[]) => {
    const positions = [
      t("positions.past"),
      t("positions.present"),
      t("positions.future"),
    ];
    return positions
      .map((position, index) => {
        const card = cards[index];
        return `${position}: ${card.name} - ${card.keywords
          .slice(0, 3)
          .join(", ")}`;
      })
      .join("\n");
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
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><g fill='%23ffffff' fill-opacity='0.1'><circle cx='30' cy='30' r='1'/><circle cx='15' cy='15' r='0.5'/><circle cx='45' cy='45' r='0.5'/></g></g></svg>")`,
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-300 rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      {/* Header */}
      <header className="relative z-10 text-center pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-200 via-purple-100 to-indigo-200 bg-clip-text text-transparent">
            {t("home.title")}
          </h1>
          <p className="text-xl md:text-2xl text-purple-300 mb-2">
            {t("home.subtitle")}
          </p>
          <p className="text-purple-400">{t("home.description")}</p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {!showResults ? (
          /* Initial Card Draw Section */
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-purple-600/30 shadow-2xl">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-8">
                <i className="fas fa-magic text-6xl text-purple-300"></i>
              </motion.div>

              <h2 className="font-serif text-2xl md:text-3xl font-bold text-purple-200 mb-6">
                {t("home.drawCards")}
              </h2>

              <p className="text-purple-300 mb-8 leading-relaxed">
                {t("home.drawInstruction")}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDrawCards}
                disabled={isDrawing}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg border border-purple-400/50 disabled:opacity-50">
                <i className="fas fa-magic mr-3"></i>
                {isDrawing ? t("home.drawingCards") : t("home.drawButton")}
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
              className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-purple-200 mb-4">
                {t("home.destiny")}
              </h2>
              <div className="flex justify-center space-x-8 text-purple-300 font-medium">
                <span className="text-center">
                  <i className="fas fa-history block text-2xl mb-2"></i>
                  {t("positions.past")}
                </span>
                <span className="text-center">
                  <i className="fas fa-clock block text-2xl mb-2"></i>
                  {t("positions.present")}
                </span>
                <span className="text-center">
                  <i className="fas fa-crystal-ball block text-2xl mb-2"></i>
                  {t("positions.future")}
                </span>
              </div>
            </motion.div>

            {/* Cards Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {drawnCards.map((card, index) => {
                const positionKeys: PositionKey[] = [
                  "past",
                  "present",
                  "future",
                ];
                return (
                  <TarotCardComponent
                    key={card.id}
                    card={card}
                    position={positionKeys[index]}
                    index={index}
                    onClick={() => handleCardClick(card)}
                  />
                );
              })}
            </div>

            {/* Reading Results */}
            <ReadingResults cards={drawnCards} onDrawAgain={resetReading} />
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
