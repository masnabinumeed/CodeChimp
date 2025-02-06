import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertProjectSchema } from "@shared/schema";

const mockProjects = [
  {
    id: 1,
    title: "Modern E-commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory management.",
    category: "web",
    techStack: ["React", "Node.js", "PostgreSQL", "Redis"],
    imageUrls: ["https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8"],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/project",
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Food Delivery App",
    description: "Cross-platform mobile app for food delivery services.",
    category: "mobile",
    techStack: ["React Native", "Firebase", "Google Maps API"],
    imageUrls: ["https://images.unsplash.com/photo-1675703818188-cee153b831f3"],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/project",
    createdAt: new Date()
  },
  {
    id: 3,
    title: "Enterprise Resource Planning",
    description: "Desktop application for business resource management.",
    category: "desktop",
    techStack: ["Electron", "TypeScript", "SQLite"],
    imageUrls: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/project",
    createdAt: new Date()
  }
];

export function registerRoutes(app: Express): Server {
  // Projects API
  app.get("/api/projects", (_req, res) => {
    res.json(mockProjects);
  });

  app.get("/api/projects/:category", (req, res) => {
    const { category } = req.params;
    const filtered = mockProjects.filter(p => p.category === category);
    res.json(filtered);
  });

  // Contact Form API
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      await storage.createContactMessage(data);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Invalid form data" });
    }
  });

  return createServer(app);
}
