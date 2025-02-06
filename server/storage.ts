import { mediaAssets, type MediaAsset, type InsertMediaAsset, contactMessages, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Media management
  getMediaAssets(): Promise<MediaAsset[]>;
  getMediaAssetsByCategory(category: string): Promise<MediaAsset[]>;
  createMediaAsset(asset: InsertMediaAsset): Promise<MediaAsset>;
  deleteMediaAsset(id: number): Promise<void>;

  // Contact form
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async getMediaAssets(): Promise<MediaAsset[]> {
    return await db.select().from(mediaAssets);
  }

  async getMediaAssetsByCategory(category: string): Promise<MediaAsset[]> {
    return await db
      .select()
      .from(mediaAssets)
      .where(eq(mediaAssets.category, category));
  }

  async createMediaAsset(asset: InsertMediaAsset): Promise<MediaAsset> {
    const [newAsset] = await db
      .insert(mediaAssets)
      .values(asset)
      .returning();
    return newAsset;
  }

  async deleteMediaAsset(id: number): Promise<void> {
    await db.delete(mediaAssets).where(eq(mediaAssets.id, id));
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();