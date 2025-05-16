import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  category: text("category", { enum: ["web", "mobile", "desktop"] }).notNull(),
  techStack: text("tech_stack").notNull(), // Will store as JSON string
  imageUrls: text("image_urls").notNull(), // Will store as JSON string
  videoUrls: text("video_urls").notNull(), // Will store as JSON string
  demoUrl: text("demo_url"),
  githubUrl: text("github_url"),
  screenshots: text("screenshots").notNull(), // Will store as JSON string
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`)
});

export const mediaAssets = sqliteTable("media_assets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  type: text("type", { enum: ["image", "video", "logo"] }).notNull(),
  url: text("url").notNull(),
  category: text("category", { enum: ["project", "home", "brand"] }).notNull(),
  projectId: integer("project_id").references(() => projects.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`)
});

export const projectReviews = sqliteTable("project_reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  customerName: text("customer_name").notNull(),
  rating: integer("rating").notNull(),
  review: text("review").notNull(),
  customerCompany: text("customer_company"),
  customerAvatar: text("customer_avatar"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`)
});

export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`)
});

// Insert schemas
export const insertMediaAssetSchema = createInsertSchema(mediaAssets).omit({
  id: true,
  createdAt: true
});

export const insertProjectSchema = createInsertSchema(projects).omit({ 
  id: true,
  createdAt: true 
});

export const insertReviewSchema = createInsertSchema(projectReviews).omit({ 
  id: true,
  createdAt: true 
});

export const insertContactSchema = createInsertSchema(contactMessages).omit({ 
  id: true,
  createdAt: true 
});

// Types
export type MediaAsset = typeof mediaAssets.$inferSelect;
export type InsertMediaAsset = z.infer<typeof insertMediaAssetSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type ProjectReview = typeof projectReviews.$inferSelect;
export type InsertProjectReview = z.infer<typeof insertReviewSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactSchema>;