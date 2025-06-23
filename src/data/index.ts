import { TarotCard } from "@shared/schema";
import { tarotCardsKo } from "./tarotCards.ko";
import { tarotCardsEn } from "./tarotCards.en";

export type Language = "ko" | "en";

export function getTarotCards(language: Language = "ko"): TarotCard[] {
  switch (language) {
    case "en":
      return tarotCardsEn;
    case "ko":
    default:
      return tarotCardsKo;
  }
}

export function getRandomCards(
  count: number = 3,
  language: Language = "ko"
): TarotCard[] {
  const cards = getTarotCards(language);
  const shuffled = [...cards];

  // 더 확실한 랜덤성을 위해 여러 번 섞기
  for (let round = 0; round < 3; round++) {
    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  }

  // 추가적인 랜덤성을 위해 시작 위치도 랜덤하게 선택
  const startIndex = Math.floor(Math.random() * (shuffled.length - count));
  return shuffled.slice(startIndex, startIndex + count);
}

export function getCardById(
  id: number,
  language: Language = "ko"
): TarotCard | undefined {
  const cards = getTarotCards(language);
  return cards.find((card) => card.id === id);
}

// 특정 카드 ID에 대한 언어별 카드 정보를 가져오는 유틸리티 함수
export function getLocalizedCard(
  cardId: number,
  language: Language = "ko"
): TarotCard | undefined {
  return getCardById(cardId, language);
}
