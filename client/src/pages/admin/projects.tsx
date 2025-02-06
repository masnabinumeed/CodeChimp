import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2 } from "lucide-react";
import type { Project, InsertProject } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";

const categories = [
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "desktop", label: "Desktop" }
];

export default function ProjectManager() {
  const [selectedCategory, setSelectedCategory] = useState("web");
  const { toast } = useToast();

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"]
  });

  const createProjectMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create project");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Success",
        description: "Project created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create project",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Convert tech stack string to array
    const techStackString = formData.get("techStack") as string;
    const techStack = techStackString.split(",").map(tech => tech.trim());
    
    // Create the project data
    const projectData = {
      title: formData.get("title"),
      description: formData.get("description"),
      longDescription: formData.get("longDescription"),
      category: selectedCategory,
      techStack,
      imageUrls: [],
      videoUrls: [],
      screenshots: [],
      demoUrl: formData.get("demoUrl"),
      githubUrl: formData.get("githubUrl"),
    };

    createProjectMutation.mutate(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Project Manager</h1>

      {/* Create New Project Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Title</label>
                <Input name="title" required placeholder="Enter project title" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Short Description</label>
                <Input name="description" required placeholder="Brief project description" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tech Stack</label>
                <Input name="techStack" required placeholder="React, Node.js, PostgreSQL (comma-separated)" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Demo URL</label>
                <Input name="demoUrl" placeholder="https://demo.example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub URL</label>
                <Input name="githubUrl" placeholder="https://github.com/example/project" />
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Long Description</label>
                <Textarea 
                  name="longDescription" 
                  placeholder="Detailed project description with features and technical details"
                  className="min-h-[200px]"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={createProjectMutation.isPending}
              className="w-full"
            >
              {createProjectMutation.isPending ? "Creating..." : "Create Project"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3].map((n) => (
            <div key={n} className="h-[300px] rounded-lg bg-gray-100 animate-pulse" />
          ))
        ) : (
          projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-primary/10 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
