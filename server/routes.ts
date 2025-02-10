import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import express from 'express';
import { storage } from "./storage";
import { insertContactSchema, insertMediaAssetSchema, insertProjectSchema, insertReviewSchema } from "@shared/schema";
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
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/webm"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}. Allowed types are: ${allowedTypes.join(', ')}`));
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

export function registerRoutes(app: Express): Server {
  // Projects API
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getProjects();
      const projectsWithReviews = await Promise.all(
        projects.map(async (project) => ({
          ...project,
          reviews: await storage.getProjectReviews(project.id)
        }))
      );
      res.json(projectsWithReviews);
    } catch (error) {
      console.error('Projects fetch error:', error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const projects = await storage.getProjectsByCategory(category);
      const projectsWithReviews = await Promise.all(
        projects.map(async (project) => ({
          ...project,
          reviews: await storage.getProjectReviews(project.id)
        }))
      );
      res.json(projectsWithReviews);
    } catch (error) {
      console.error('Projects fetch by category error:', error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const data = insertProjectSchema.parse(req.body);
      const newProject = await storage.createProject(data);
      res.json(newProject);
    } catch (error) {
      console.error('Project creation error:', error);
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const data = insertProjectSchema.parse(req.body);
      const updatedProject = await storage.updateProject(projectId, data);
      res.json(updatedProject);
    } catch (error) {
      console.error('Project update error:', error);
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  app.post("/api/projects/:projectId/reviews", async (req, res) => {
    try {
      const data = insertReviewSchema.parse({
        ...req.body,
        projectId: parseInt(req.params.projectId)
      });
      const newReview = await storage.createProjectReview(data);
      res.json(newReview);
    } catch (error) {
      console.error('Review creation error:', error);
      res.status(400).json({ error: "Invalid review data" });
    }
  });

  // Contact Form API
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      const nodemailer = require('nodemailer');
      
      const transporter = nodemailer.createTransport({
        host: 'techmonkeys.io',
        port: 465,
        secure: true,
        auth: {
          user: 'muneeb@techmonkeys.io',
          pass: 'techMonkeys_01'
        }
      });

      await transporter.sendMail({
        from: 'muneeb@techmonkeys.io',
        to: 'muneeb@techmonkeys.io',
        subject: 'New Contact Form Submission',
        text: `
New contact form submission:
Name: ${data.name}
Email: ${data.email}
Message: ${data.message}
        `
      });

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