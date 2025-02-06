import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Star, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Project, ProjectReview } from "@shared/schema";
import { cn } from "@/lib/utils";
import { ProjectDialog } from "./project-dialog";

interface ProjectCardProps {
  project: Project;
  reviews?: ProjectReview[];
}

export function ProjectCard({ project, reviews = [] }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const allImages = [project.imageUrls[0], ...(project.screenshots || [])];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setDialogOpen(true)}
      >
        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
          <div className="aspect-video relative overflow-hidden">
            <img 
              src={allImages[currentImageIndex]} 
              alt={`${project.title} - ${currentImageIndex + 1}/${allImages.length}`}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {allImages.length > 1 && (
              <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.demoUrl, '_blank');
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                  Demo
                </Button>
              )}
              {project.githubUrl && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="group/btn hover:border-primary hover:text-primary transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.githubUrl, '_blank');
                  }}
                >
                  <Github className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                  Code
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <ProjectDialog
        project={project}
        reviews={reviews}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}