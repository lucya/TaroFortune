import { TarotCard } from "@shared/schema";
import { tarotCardsKo } from "./tarotCards.ko";
import { tarotCardsEn } from "./tarotCards.en";

type Language = "ko" | "en";

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

  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

export function getCardById(
  id: number,
  language: Language = "ko"
): TarotCard | undefined {
  const cards = getTarotCards(language);
  return cards.find((card) => card.id === id);
}
