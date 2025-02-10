
import { useState } from "react";
import { ProjectCard } from "@/components/project-card";

const sampleProjects = [
  {
    id: 1,
    title: "Modern E-commerce Platform",
    description: "A full-featured e-commerce platform built with React and Node.js",
    longDescription: "A comprehensive e-commerce solution with features like product management, cart functionality, user authentication, and payment integration.",
    category: "web",
    imageUrls: ["https://images.unsplash.com/photo-1557821552-17105176677c"],
    screenshots: ["https://images.unsplash.com/photo-1557821552-17105176677c"],
    videoUrls: [],
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "Docker"],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/project",
    reviews: [{ id: 1, projectId: 1, name: "John Doe", rating: 5, comment: "Excellent platform", date: new Date().toISOString(), customerAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d" }]
  },
  {
    id: 2,
    title: "Fitness Tracking App",
    description: "Cross-platform mobile app for tracking workouts and nutrition",
    longDescription: "A comprehensive fitness tracking solution with workout plans, nutrition logging, and progress analytics.",
    category: "mobile",
    imageUrls: ["https://images.unsplash.com/photo-1526506118085-60ce8714f8c5"],
    screenshots: ["https://images.unsplash.com/photo-1526506118085-60ce8714f8c5"],
    videoUrls: [],
    techStack: ["React Native", "Firebase", "Redux", "TypeScript"],
    demoUrl: "https://demo.example.com/fitness",
    githubUrl: "https://github.com/example/fitness",
    reviews: [{ id: 2, projectId: 2, name: "Jane Smith", rating: 4, comment: "Great mobile app", date: new Date().toISOString(), customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" }]
  },
  {
    id: 3,
    title: "Code Editor IDE",
    description: "Professional desktop IDE for developers with advanced features",
    longDescription: "A powerful code editor with syntax highlighting, debugging tools, and git integration.",
    category: "desktop",
    imageUrls: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6"],
    screenshots: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6"],
    videoUrls: [],
    techStack: ["Electron", "TypeScript", "Monaco Editor", "Node.js"],
    demoUrl: "https://demo.example.com/editor",
    githubUrl: "https://github.com/example/editor",
    reviews: [{ id: 3, projectId: 3, name: "Mike Johnson", rating: 5, comment: "Powerful IDE", date: new Date().toISOString(), customerAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36" }]
  },
  {
    id: 4,
    title: "NFT Marketplace",
    description: "Decentralized marketplace for trading digital collectibles",
    longDescription: "A Web3 platform for minting, buying, and selling NFTs with wallet integration.",
    category: "web3",
    imageUrls: ["https://images.unsplash.com/photo-1644658722893-2f1564623412"],
    screenshots: ["https://images.unsplash.com/photo-1644658722893-2f1564623412"],
    videoUrls: [],
    techStack: ["Solidity", "React", "Web3.js", "IPFS"],
    demoUrl: "https://demo.example.com/nft",
    githubUrl: "https://github.com/example/nft",
    reviews: [{ id: 4, projectId: 4, name: "Alex Chen", rating: 5, comment: "Amazing NFT platform", date: new Date().toISOString(), customerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" }]
  }
];

const categories = [
  { value: "all", label: "All Projects" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "desktop", label: "Desktop" },
  { value: "web3", label: "Web3" }
];

export default function Projects() {
  const [category, setCategory] = useState("all");

  const filteredProjects = category === "all" 
    ? sampleProjects 
    : sampleProjects.filter(project => project.category === category);

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Our Projects</h1>

        <div className="flex gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                category === cat.value
                  ? "bg-primary text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              reviews={project.reviews}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
