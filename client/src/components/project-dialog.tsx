import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import type { Project, ProjectReview } from "@shared/schema";
import { cn } from "@/lib/utils";

interface ProjectDialogProps {
  project: Project;
  reviews?: ProjectReview[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDialog({ project, reviews = [], open, onOpenChange }: ProjectDialogProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const allMedia = [
    ...project.imageUrls,
    ...project.screenshots,
    ...project.videoUrls
  ];

  const isVideo = (url: string) => url.endsWith('.mp4') || url.includes('youtube.com');

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % allMedia.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-2xl">{project.title}</span>
            <Badge variant="secondary" className="capitalize">
              {project.category}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Media Gallery */}
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            {isVideo(allMedia[currentMediaIndex]) ? (
              <video
                src={allMedia[currentMediaIndex]}
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={allMedia[currentMediaIndex]}
                alt={`${project.title} - ${currentMediaIndex + 1}`}
                className="w-full h-full object-contain"
              />
            )}

            {allMedia.length > 1 && (
              <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                  onClick={prevMedia}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                  onClick={nextMedia}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {allMedia.map((media, index) => (
              <button
                key={media}
                onClick={() => setCurrentMediaIndex(index)}
                className={cn(
                  "relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden",
                  currentMediaIndex === index && "ring-2 ring-primary"
                )}
              >
                {isVideo(media) ? (
                  <video
                    src={media}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={media}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About the Project</h3>
            <p className="text-muted-foreground">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge 
                  key={tech} 
                  variant="outline"
                  className="bg-primary/5"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Reviews */}
          {reviews.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customer Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="p-4 rounded-lg bg-primary/5">
                    <div className="flex items-center gap-3 mb-2">
                      {review.customerAvatar && (
                        <img
                          src={review.customerAvatar}
                          alt={review.customerName}
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <div>
                        <p className="font-medium">{review.customerName}</p>
                        {review.customerCompany && (
                          <p className="text-sm text-muted-foreground">{review.customerCompany}</p>
                        )}
                      </div>
                      <div className="ml-auto flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.review}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-3">
            {project.demoUrl && (
              <Button variant="outline" asChild>
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" asChild>
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
