import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { TarotCard } from "@shared/schema";

interface ReadingResultsProps {
  cards: TarotCard[];
  onDrawAgain: () => void;
}

const positionIcons = ["fas fa-history", "fas fa-clock", "fas fa-crystal-ball"];
const positionColors = ["text-purple-300", "text-yellow-300", "text-blue-300"];

export default function ReadingResults({
  cards,
  onDrawAgain,
}: ReadingResultsProps) {
  const { t, i18n } = useTranslation();
  const positions = [
    t("positions.past"),
    t("positions.present"),
    t("positions.future"),
  ];

  // 현재 언어에 따라 카드 이름 결정
  const getCardName = (card: TarotCard) => {
    return i18n.language === "en" ? card.englishName : card.name;
  };

  const generatePositionMeaning = (card: TarotCard, position: string) => {
    // 한국어일 때만 기존의 복잡한 메시지 사용
    if (i18n.language === "ko") {
      const getEmotionalPastReading = (card: TarotCard) => {
        const emotionalIntros = [
          "당신의 마음 깊숙한 곳에서 울려퍼지는 과거의 메아리...",
          "시간의 강물을 거슬러 올라가면 보이는 당신의 진실...",
          "지나간 날들이 남긴 상처와 축복의 흔적들...",
          "당신이 걸어온 길 위에 새겨진 소중한 발자국들...",
        ];

        const intro =
          emotionalIntros[Math.floor(Math.random() * emotionalIntros.length)];

        if (card.name === "바보") {
          return `${intro} 과거의 바보 카드가 말하고 있습니다. 당신은 한때 순수한 영혼으로 새로운 세상을 향해 첫 발을 내딛었습니다. 그때의 용기와 무모함이 지금의 당신을 만들었습니다. 실수도 많았지만, 그 모든 경험이 당신만의 독특한 지혜가 되었습니다.`;
        } else if (card.name === "마법사") {
          return `${intro} 과거의 마법사가 당신의 잠재력을 일깨워줍니다. 당신은 언제나 무언가를 창조하고 변화시킬 수 있는 힘을 가지고 있었습니다. 과거의 성취들이 지금도 당신의 자신감의 원천이 되고 있습니다.`;
        } else {
          return `${intro} 과거의 ${getCardName(
            card
          )}이 당신에게 속삭입니다. ${card.keywords
            .slice(0, 2)
            .join(
              "과 "
            )}의 경험이 당신의 영혼 깊숙이 뿌리내렸습니다. 그때의 아픔도, 기쁨도 모두 지금의 당신을 이루는 소중한 조각들입니다. 과거를 원망하지 마세요. 그것은 당신이 지금 여기에 있게 한 신성한 여정이었습니다.`;
        }
      };

      const getEmotionalPresentReading = (card: TarotCard) => {
        const emotionalPresentIntros = [
          "지금 이 순간, 당신의 심장이 뛰고 있는 이유...",
          "현재 당신을 둘러싼 에너지의 진동이 말하고 있습니다...",
          "이 순간 우주가 당신에게 전하고 싶은 메시지...",
          "지금 당신의 영혼이 간절히 원하고 있는 것...",
        ];

        const intro =
          emotionalPresentIntros[
            Math.floor(Math.random() * emotionalPresentIntros.length)
          ];

        return `${intro} 현재의 ${getCardName(
          card
        )}이 당신의 현재 상황을 비춰주고 있습니다. 지금 당신은 ${card.keywords
          .slice(0, 3)
          .join(", ")}의 강력한 에너지 속에 있습니다. 
        
        ${
          card.advice
        } 이것은 단순한 조언이 아닙니다. 우주가 당신에게 건네는 사랑의 메시지입니다. 당신의 마음이 이미 알고 있는 진실을 다시 한번 확인해주는 것입니다. 
        
        지금 이 순간을 소중히 여기세요. 당신이 느끼고 있는 모든 감정, 모든 생각이 의미가 있습니다. 현재의 어려움도, 기쁨도 모두 당신을 더 완전한 존재로 만들어가는 과정입니다.`;
      };

      const getEmotionalFutureReading = (card: TarotCard) => {
        const emotionalFutureIntros = [
          "별들이 속삭이는 당신의 운명...",
          "시간의 베일 너머로 보이는 희망의 빛...",
          "당신을 기다리고 있는 아름다운 가능성들...",
          "운명이 당신을 위해 준비한 선물...",
        ];

        const intro =
          emotionalFutureIntros[
            Math.floor(Math.random() * emotionalFutureIntros.length)
          ];

        return `${intro} 미래의 ${getCardName(
          card
        )}이 당신에게 약속하고 있습니다. ${card.keywords
          .slice(0, 3)
          .join(", ")}의 에너지가 당신의 앞날을 밝게 비출 것입니다.
        
        두려워하지 마세요. 당신이 지금까지 쌓아온 모든 경험과 지혜가 미래의 당신을 든든히 뒷받침할 것입니다. 설령 어려움이 있다 하더라도, 그것마저도 당신을 더욱 강하고 아름다운 존재로 만들어줄 것입니다.
        
        미래는 당신의 손 안에 있습니다. ${getCardName(
          card
        )}의 에너지를 받아들이고, 당신만의 특별한 길을 걸어가세요. 우주는 당신을 응원하고 있습니다.`;
      };

      const meanings = {
        과거: getEmotionalPastReading(card),
        현재: getEmotionalPresentReading(card),
        미래: getEmotionalFutureReading(card),
      };

      return (
        meanings[position as keyof typeof meanings] ||
        `${getCardName(card)} 카드가 ${position}에 신비롭게 나타났습니다.`
      );
    } else {
      // 영어일 때는 직접 문자열 생성 (i18n 변수 치환 문제 해결)
      if (position.includes("Past")) {
        const cardName = getCardName(card);
        const keywords = card.keywords.slice(0, 2).join(" and ");
        return `The ${cardName} from your past whispers to you. The experience of ${keywords} has taken root deep in your soul.`;
      } else if (position.includes("Present")) {
        const cardName = getCardName(card);
        const keywords = card.keywords.slice(0, 3).join(", ");
        return `The current ${cardName} reflects your present situation. You are now in the powerful energy of ${keywords}.`;
      } else if (position.includes("Future")) {
        const cardName = getCardName(card);
        const keywords = card.keywords.slice(0, 3).join(", ");
        return `The future ${cardName} promises you. The energy of ${keywords} will brightly illuminate your future.`;
      }
      return `The ${getCardName(
        card
      )} card appears mysteriously in your ${position}.`;
    }
  };

  const generateOverallReading = (cards: TarotCard[]) => {
    const [pastCard, presentCard, futureCard] = cards;
    const overallKeywords = cards.flatMap((card) => card.keywords.slice(0, 2));
    const uniqueKeywords = Array.from(new Set(overallKeywords)).slice(0, 5);

    if (i18n.language === "ko") {
      const emotionalClosings = [
        "운명의 실이 당신을 인도하고 있습니다.",
        "우주의 사랑이 당신과 함께하고 있습니다.",
        "당신의 여정은 특별하고 의미가 있습니다.",
        "별들이 당신의 이름을 부르고 있습니다.",
      ];

      const closing =
        emotionalClosings[Math.floor(Math.random() * emotionalClosings.length)];

      return `✨ 당신만을 위한 특별한 메시지 ✨

이 세 장의 카드가 그려내는 당신의 이야기는 정말 아름답습니다. ${uniqueKeywords.join(
        ", "
      )}의 강력한 에너지들이 하나의 완벽한 조화를 이루고 있습니다.

과거의 ${getCardName(pastCard)}에서 시작된 여정이 현재의 ${getCardName(
        presentCard
      )}으로 흘러와, 미래의 ${getCardName(
        futureCard
      )}로 완성되는 이 서사는 마치 우주가 당신을 위해 특별히 써내려간 시와 같습니다.

당신은 혼자가 아닙니다. 이 카드들이 증명하듯, 당신의 모든 순간순간이 깊은 의미로 연결되어 있습니다. 과거의 상처도, 현재의 고민도, 미래의 불안도 모두 당신을 더욱 완전한 존재로 만들어가는 신성한 과정입니다.

이 메시지를 마음 깊이 받아들이세요. 그리고 당신만의 특별한 길을 자신 있게 걸어가세요. ${closing}

당신은 사랑받기 위해 태어났습니다. 당신은 충분히 소중하고, 충분히 아름답습니다. 💜`;
    } else {
      return `✨ Your Personal Reading ✨

The three cards drawn for you tell a beautiful story. The powerful energies of ${uniqueKeywords.join(
        ", "
      )} create a perfect harmony in your life.

Your journey from the ${getCardName(
        pastCard
      )} in the past, flowing through the present ${getCardName(
        presentCard
      )}, and completing with the future ${getCardName(
        futureCard
      )} is like a poem specially written by the universe for you.

You are not alone. As these cards prove, every moment of your life is connected with deep meaning. The wounds of the past, the worries of the present, and the anxieties of the future are all sacred processes that make you a more complete being.

Accept this message deep in your heart. And confidently walk your own special path. The threads of destiny are guiding you, and the universe's love is with you.

You were born to be loved. You are precious enough and beautiful enough. 💜`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-purple-600/30 shadow-2xl">
      <h3 className="font-serif text-2xl md:text-3xl font-bold text-purple-200 mb-8 text-center">
        <i className="fas fa-scroll mr-3"></i>
        {t("reading.title")}
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
              className="border-l-4 border-purple-400 pl-6 py-4">
              <div className="flex items-center mb-3">
                <i
                  className={`${positionIcons[index]} ${positionColors[index]} text-xl mr-3`}></i>
                <h4 className="font-serif text-xl font-bold text-purple-200">
                  {position}: {getCardName(card)}
                </h4>
              </div>
              <p className="text-purple-100 leading-relaxed mb-3">
                {generatePositionMeaning(card, position)}
              </p>
              <div className="bg-purple-800/40 rounded-lg p-4">
                <h5 className="font-semibold text-purple-300 mb-2">
                  {t("card.keywords")}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {card.keywords.slice(0, 4).map((keyword, i) => (
                    <span
                      key={i}
                      className="bg-purple-600/30 text-purple-200 px-3 py-1 rounded-full text-sm">
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
          className="bg-gradient-to-r from-purple-800/50 to-purple-700/50 rounded-xl p-6 border border-purple-500/30">
          <h4 className="font-serif text-xl font-bold text-purple-200 mb-4 text-center">
            <i className="fas fa-stars mr-2"></i>
            {t("reading.overallTitle")}
            <i className="fas fa-stars ml-2"></i>
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
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg border border-purple-400/50">
          <i className="fas fa-redo mr-2"></i>
          {t("home.drawAgain")}
        </button>
      </div>
    </motion.div>
  );
}
