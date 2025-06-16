import { tarotReadings, type TarotReading, type InsertTarotReading } from "@shared/schema";

export interface IStorage {
  getTarotReading(id: number): Promise<TarotReading | undefined>;
  createTarotReading(reading: InsertTarotReading): Promise<TarotReading>;
  getAllTarotReadings(): Promise<TarotReading[]>;
}

export class MemStorage implements IStorage {
  private readings: Map<number, TarotReading>;
  private currentId: number;

  constructor() {
    this.readings = new Map();
    this.currentId = 1;
  }

  async getTarotReading(id: number): Promise<TarotReading | undefined> {
    return this.readings.get(id);
  }

  async createTarotReading(insertReading: InsertTarotReading): Promise<TarotReading> {
    const id = this.currentId++;
    const reading: TarotReading = {
      ...insertReading,
      id,
      createdAt: new Date(),
    };
    this.readings.set(id, reading);
    return reading;
  }

  async getAllTarotReadings(): Promise<TarotReading[]> {
    return Array.from(this.readings.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export const storage = new MemStorage();
