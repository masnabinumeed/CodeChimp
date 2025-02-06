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
    longDescription: `Our modern e-commerce platform is a comprehensive solution built with scalability and performance in mind. 

    Key Features:
    - Real-time inventory management
    - Advanced search and filtering
    - Secure payment processing
    - Order tracking and management
    - Analytics dashboard

    The platform uses React for the frontend, Node.js for the backend, and PostgreSQL for data storage. Redis is used for caching and real-time features.`,
    category: "web",
    techStack: ["React", "Node.js", "PostgreSQL", "Redis"],
    imageUrls: ["https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8"],
    videoUrls: [
      "https://static.videezy.com/system/resources/previews/000/051/958/original/code1291.mp4"
    ],
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
    longDescription: `A modern food delivery application built using React Native, offering a seamless experience across iOS and Android platforms.

    Key Features:
    - Real-time order tracking
    - Restaurant discovery
    - In-app payments
    - Driver tracking
    - Order history

    The app uses Firebase for backend services and real-time updates, with Google Maps API for location services.`,
    category: "mobile",
    techStack: ["React Native", "Firebase", "Google Maps API"],
    imageUrls: ["https://images.unsplash.com/photo-1675703818188-cee153b831f3"],
    videoUrls: [
      "https://static.videezy.com/system/resources/previews/000/052/026/original/Mobile1.mp4"
    ],
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
    longDescription: `A comprehensive ERP system built using Electron, providing a native desktop experience for business resource management.

    Key Features:
    - Inventory management
    - Human resources
    - Financial tracking
    - Project management
    - Reporting tools

    Built with Electron and TypeScript, using SQLite for local data storage and synchronization.`,
    category: "desktop",
    techStack: ["Electron", "TypeScript", "SQLite"],
    imageUrls: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"],
    videoUrls: [
      "https://static.videezy.com/system/resources/previews/000/052/003/original/Monitor1.mp4"
    ],
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