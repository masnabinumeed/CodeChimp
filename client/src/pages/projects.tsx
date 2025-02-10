
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
    screenshots: [
      "https://images.unsplash.com/photo-1557821552-17105176677c",
      "https://images.unsplash.com/photo-1557821552-17105176677c"
    ],
    videoUrls: [],
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "Docker"],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/project",
    reviews: [
      {
        id: 1,
        projectId: 1,
        name: "John Doe",
        rating: 5,
        comment: "Excellent platform with great features",
        date: new Date().toISOString()
      }
    ]
  }
];

const categories = [
  { value: "all", label: "All Projects" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "desktop", label: "Desktop" }
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
              className={`px-4 py-2 rounded-full ${
                category === cat.value
                  ? "bg-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200"
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
