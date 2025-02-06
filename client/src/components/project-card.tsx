import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@shared/schema";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={project.imageUrls[0]} 
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardHeader className="relative">
          <CardTitle className="flex items-center justify-between gap-4">
            <span className="text-xl group-hover:text-primary transition-colors duration-300">
              {project.title}
            </span>
            <Badge variant="secondary" className="capitalize">
              {project.category}
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech) => (
              <Badge 
                key={tech} 
                variant="outline"
                className="bg-primary/5 hover:bg-primary/10 transition-colors duration-300"
              >
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3">
            {project.demoUrl && (
              <Button 
                variant="outline" 
                size="sm" 
                className="group/btn hover:border-primary hover:text-primary transition-colors duration-300"
                asChild
              >
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                  Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button 
                variant="outline" 
                size="sm"
                className="group/btn hover:border-primary hover:text-primary transition-colors duration-300"
                asChild
              >
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                  Code
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}