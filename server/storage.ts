import { mediaAssets, type MediaAsset, type InsertMediaAsset, 
         contactMessages, type ContactMessage, type InsertContactMessage,
         projects, type Project, type InsertProject,
         projectReviews, type ProjectReview, type InsertProjectReview } from "@shared/schema";
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

  // Project management
  getProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getProjectReviews(projectId: number): Promise<ProjectReview[]>;
  createProject(project: InsertProject): Promise<Project>;
  createProjectReview(review: InsertProjectReview): Promise<ProjectReview>;
  updateProject(id: number, project: InsertProject): Promise<Project>;
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

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.category, category));
  }

  async getProjectReviews(projectId: number): Promise<ProjectReview[]> {
    return await db
      .select()
      .from(projectReviews)
      .where(eq(projectReviews.projectId, projectId));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db
      .insert(projects)
      .values(project)
      .returning();
    return newProject;
  }

  async createProjectReview(review: InsertProjectReview): Promise<ProjectReview> {
    const [newReview] = await db
      .insert(projectReviews)
      .values(review)
      .returning();
    return newReview;
  }

  async updateProject(id: number, project: InsertProject): Promise<Project> {
    const [updatedProject] = await db
      .update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }
}

export const storage = new DatabaseStorage();