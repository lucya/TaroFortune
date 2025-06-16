import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTarotReadingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all tarot readings
  app.get("/api/readings", async (req, res) => {
    try {
      const readings = await storage.getAllTarotReadings();
      res.json(readings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch readings" });
    }
  });

  // Get a specific tarot reading
  app.get("/api/readings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid reading ID" });
      }
      
      const reading = await storage.getTarotReading(id);
      if (!reading) {
        return res.status(404).json({ error: "Reading not found" });
      }
      
      res.json(reading);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reading" });
    }
  });

  // Create a new tarot reading
  app.post("/api/readings", async (req, res) => {
    try {
      const validatedData = insertTarotReadingSchema.parse(req.body);
      const reading = await storage.createTarotReading(validatedData);
      res.status(201).json(reading);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create reading" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
