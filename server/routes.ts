import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import express from 'express';
import { storage } from "./storage";
import { insertContactSchema, insertMediaAssetSchema } from "@shared/schema";
import fs from 'fs';

// Ensure uploads directory exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}. Allowed types are: ${allowedTypes.join(', ')}`));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

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
      console.error('Contact form error:', error);
      res.status(400).json({ error: "Invalid form data" });
    }
  });

  // Media Management API
  app.get("/api/media", async (_req, res) => {
    try {
      const assets = await storage.getMediaAssets();
      res.json(assets);
    } catch (error) {
      console.error('Media fetch error:', error);
      res.status(500).json({ error: "Failed to fetch media assets" });
    }
  });

  app.get("/api/media/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const assets = category === "all" 
        ? await storage.getMediaAssets()
        : await storage.getMediaAssetsByCategory(category);
      res.json(assets);
    } catch (error) {
      console.error('Media fetch by category error:', error);
      res.status(500).json({ error: "Failed to fetch media assets" });
    }
  });

  app.post("/api/media/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("No file uploaded");
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      const mediaData = {
        name: req.file.originalname,
        type: req.body.type,
        url: fileUrl,
        category: req.body.category,
        projectId: req.body.projectId ? parseInt(req.body.projectId) : undefined
      };

      console.log('Attempting to create media asset:', mediaData);
      const parsedData = insertMediaAssetSchema.parse(mediaData);
      const newAsset = await storage.createMediaAsset(parsedData);
      console.log('Media asset created:', newAsset);

      res.json({ success: true, file: newAsset });
    } catch (error) {
      console.error('Media upload error:', error);
      // Delete uploaded file if database operation fails
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting failed upload:', err);
        });
      }
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid upload data" });
    }
  });

  // Serve uploaded files statically
  app.use("/uploads", express.static(uploadDir));

  return createServer(app);
}

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
  },
  {
    id: 4,
    title: "DeFi Trading Platform",
    description: "Decentralized cryptocurrency trading platform with real-time market data.",
    longDescription: `A modern DeFi trading platform that enables users to trade cryptocurrencies with advanced features:

    Key Features:
    - Real-time market data visualization
    - Smart contract integration
    - Multi-wallet support
    - Advanced trading features
    - Performance analytics dashboard

    Built with React and Ethers.js, using Web3 technologies for blockchain integration.`,
    category: "web",
    techStack: ["React", "Ethers.js", "Web3.js", "TailwindCSS", "Node.js"],
    imageUrls: [
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0", 
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d"  
    ],
    videoUrls: [
      "https://static.videezy.com/system/resources/previews/000/051/975/original/data8001.mp4" 
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1640340434855-6084b1f4901c", 
      "https://images.unsplash.com/photo-1643101452019-bc00c9bba76b", 
      "https://images.unsplash.com/photo-1642784353782-096dc9ca1624"  
    ],
    demoUrl: "https://demo.example.com/defi",
    githubUrl: "https://github.com/example/defi-platform",
    createdAt: new Date()
  }
];