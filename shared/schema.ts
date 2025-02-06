import { pgTable, text, serial, jsonb, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  category: text("category", { enum: ["web", "mobile", "desktop"] }).notNull(),
  techStack: text("tech_stack").array().notNull(),
  imageUrls: text("image_urls").array().notNull(),
  videoUrls: text("video_urls").array().default([]).notNull(),
  demoUrl: text("demo_url"),
  githubUrl: text("github_url"),
  screenshots: text("screenshots").array().default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const projectReviews = pgTable("project_reviews", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  customerName: text("customer_name").notNull(),
  rating: integer("rating").notNull(),
  review: text("review").notNull(),
  customerCompany: text("customer_company"),
  customerAvatar: text("customer_avatar"),
  createdAt: timestamp("created_at").defaultNow()
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
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

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type ProjectReview = typeof projectReviews.$inferSelect;
export type InsertProjectReview = z.infer<typeof insertReviewSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactSchema>;