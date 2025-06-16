import { pgTable, text, serial, integer, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tarotReadings = pgTable("tarot_readings", {
  id: serial("id").primaryKey(),
  cards: json("cards").$type<number[]>().notNull(),
  interpretation: text("interpretation").notNull(),
  readingType: text("reading_type").notNull().default("past-present-future"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTarotReadingSchema = createInsertSchema(tarotReadings).pick({
  cards: true,
  interpretation: true,
  readingType: true,
});

export type InsertTarotReading = z.infer<typeof insertTarotReadingSchema>;
export type TarotReading = typeof tarotReadings.$inferSelect;

export interface TarotCard {
  id: number;
  name: string;
  englishName: string;
  type: "메이저 아르카나" | "마이너 아르카나";
  keywords: string[];
  love: string;
  relationship: string;
  money: string;
  career: string;
  advice: string;
  warning?: string;
  description?: string;
  imageUrl?: string;
}
