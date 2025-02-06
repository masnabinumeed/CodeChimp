import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertProjectSchema } from "@shared/schema";

const mockReviews = [
  {
    id: 1,
    projectId: 1,
    customerName: "John Smith",
    customerCompany: "Tech Corp",
    rating: 5,
    review: "Exceptional work on our e-commerce platform. The team delivered beyond our expectations.",
    customerAvatar: "https://i.pravatar.cc/150?u=john",
    createdAt: new Date()
  },
  {
    id: 2,
    projectId: 2,
    customerName: "Sarah Johnson",
    customerCompany: "FoodTech Inc",
    rating: 5,
    review: "The mobile app revolutionized our food delivery service. Great attention to detail!",
    customerAvatar: "https://i.pravatar.cc/150?u=sarah",
    createdAt: new Date()
  }
];

const mockProjects = [
  {
    id: 1,
    title: "Modern E-commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory management.",
    category: "web",
    techStack: ["React", "Node.js", "PostgreSQL", "Redis"],
    imageUrls: ["https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8"],
    screenshots: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85"
    ],
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
    screenshots: [
      "https://images.unsplash.com/photo-1484659619207-9165d119dafe",
      "https://images.unsplash.com/photo-1482442120256-9c03866de390"
    ],
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
    screenshots: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    ],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/project",
    createdAt: new Date()
  }
];

export function registerRoutes(app: Express): Server {
  // Projects API
  app.get("/api/projects", (_req, res) => {
    const projectsWithReviews = mockProjects.map(project => ({
      ...project,
      reviews: mockReviews.filter(review => review.projectId === project.id)
    }));
    res.json(projectsWithReviews);
  });

  app.get("/api/projects/:category", (req, res) => {
    const { category } = req.params;
    const filtered = mockProjects.filter(p => p.category === category);
    const projectsWithReviews = filtered.map(project => ({
      ...project,
      reviews: mockReviews.filter(review => review.projectId === project.id)
    }));
    res.json(projectsWithReviews);
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