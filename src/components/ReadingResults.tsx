import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { TarotCard } from "@shared/schema";
import { POSITION_CONFIG, type PositionKey } from "./TarotCard";
import { getLocalizedCard, type Language } from "@/data";

interface ReadingResultsProps {
  cards: TarotCard[];
  onDrawAgain: () => void;
}

export default function ReadingResults({
  cards,
  onDrawAgain,
}: ReadingResultsProps) {
  const { t, i18n } = useTranslation();

  const positionKeys: PositionKey[] = ["past", "present", "future"];

  // 언어별 카드 데이터를 가져오는 함수
  const getLocalizedCardName = (card: TarotCard) => {
    const localizedCard = getLocalizedCard(card.id, i18n.language as Language);
    return localizedCard?.name || card.name;
  };

  // 언어별 카드 정보를 가져오는 함수
  const getLocalizedCardInfo = (card: TarotCard) => {
    return getLocalizedCard(card.id, i18n.language as Language) || card;
  };

  const generatePositionMeaning = (
    card: TarotCard,
    positionKey: PositionKey
  ) => {
    const localizedCard = getLocalizedCardInfo(card);
    const cardName = localizedCard.name;

    // 한국어일 때만 기존의 복잡한 메시지 사용
    if (i18n.language === "ko") {
      const getEmotionalPastReading = (card: TarotCard) =>
        `과거의 ${cardName}이 당신에게 보내는 깊은 메시지입니다. 지나간 시간 속에서 ${localizedCard.keywords
          .slice(0, 2)
          .join(", ")}의 경험이 당신의 영혼 깊숙이 뿌리내렸습니다.
        
        ${
          localizedCard.advice
        } 이것은 당신이 지금까지 걸어온 길에 대한 우주의 인정입니다. 과거의 아픔도, 기쁨도 모두 당신을 지금의 당신으로 만든 소중한 경험들입니다.
        
        과거를 원망하지 마세요. 그 모든 경험이 당신에게 지혜와 힘을 주었습니다. 당신의 과거는 당신의 약점이 아니라 가장 큰 자산입니다. 그 경험들을 통해 당신은 더욱 강하고 아름다운 사람이 되었습니다.`;

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

        return `${intro} 현재의 ${cardName}이 당신의 현재 상황을 비춰주고 있습니다. 지금 당신은 ${localizedCard.keywords
          .slice(0, 3)
          .join(", ")}의 강력한 에너지 속에 있습니다. 
        
        ${
          localizedCard.advice
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

        return `${intro} 미래의 ${cardName}이 당신에게 약속하고 있습니다. ${localizedCard.keywords
          .slice(0, 3)
          .join(", ")}의 에너지가 당신의 앞날을 밝게 비출 것입니다.
        
        두려워하지 마세요. 당신이 지금까지 쌓아온 모든 경험과 지혜가 미래의 당신을 든든히 뒷받침할 것입니다. 설령 어려움이 있다 하더라도, 그것마저도 당신을 더욱 강하고 아름다운 존재로 만들어줄 것입니다.
        
        미래는 당신의 손 안에 있습니다. ${cardName}의 에너지를 받아들이고, 당신만의 특별한 길을 걸어가세요. 우주는 당신을 응원하고 있습니다.`;
      };

      const meanings = {
        past: getEmotionalPastReading(card),
        present: getEmotionalPresentReading(card),
        future: getEmotionalFutureReading(card),
      };

      return (
        meanings[positionKey] || `${cardName} 카드가 신비롭게 나타났습니다.`
      );
    }

    // 영어일 때는 직접 문자열 생성
    if (positionKey === "past") {
      const keywords = localizedCard.keywords.slice(0, 2).join(" and ");
      return `The ${cardName} from your past whispers to you. The experience of ${keywords} has taken root deep in your soul.`;
    } else if (positionKey === "present") {
      const keywords = localizedCard.keywords.slice(0, 3).join(", ");
      return `The current ${cardName} reflects your present situation. You are now in the powerful energy of ${keywords}.`;
    } else if (positionKey === "future") {
      const keywords = localizedCard.keywords.slice(0, 3).join(", ");
      return `The future ${cardName} promises you. The energy of ${keywords} will brightly illuminate your future.`;
    }
    return `The ${cardName} card appears mysteriously.`;
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

과거의 ${getLocalizedCardName(
        pastCard
      )}에서 시작된 여정이 현재의 ${getLocalizedCardName(
        presentCard
      )}으로 흘러와, 미래의 ${getLocalizedCardName(
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

Your journey from the ${getLocalizedCardName(
        pastCard
      )} in the past, flowing through the present ${getLocalizedCardName(
        presentCard
      )}, and completing with the future ${getLocalizedCardName(
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
        {positionKeys.map((positionKey, index) => {
          const card = cards[index];
          const positionConfig = POSITION_CONFIG[positionKey];
          const translatedPosition = t(positionConfig.translationKey);

          return (
            <motion.div
              key={positionKey}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              className="border-l-4 border-purple-400 pl-6 py-4">
              <div className="flex items-center mb-3">
                <i
                  className={`${positionConfig.icon} ${positionConfig.color} text-xl mr-3`}></i>
                <h4 className="font-serif text-xl font-bold text-purple-200">
                  {translatedPosition}: {getLocalizedCardName(card)}
                </h4>
              </div>
              <p className="text-purple-100 leading-relaxed mb-3">
                {generatePositionMeaning(card, positionKey)}
              </p>
              <div className="bg-purple-800/40 rounded-lg p-4">
                <h5 className="font-semibold text-purple-300 mb-2">
                  {t("card.keywords")}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {getLocalizedCardInfo(card)
                    .keywords.slice(0, 4)
                    .map((keyword, i) => (
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

      {/* Draw Again Button */}
      <div className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDrawAgain}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg border border-purple-400/50">
          <i className="fas fa-redo mr-3"></i>
          {t("reading.drawAgain")}
        </motion.button>
      </div>
    </motion.div>
  );
}
