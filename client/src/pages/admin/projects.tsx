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
import { Upload, Trash2, Star } from "lucide-react";
import type { Project, InsertProject, ProjectReview } from "@shared/schema"; // Added import for ProjectReview
import { queryClient } from "@/lib/queryClient";

const categories = [
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "desktop", label: "Desktop" }
];

export default function ProjectManager() {
  const [selectedCategory, setSelectedCategory] = useState("web");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);
  const [uploadedScreenshots, setUploadedScreenshots] = useState<string[]>([]);
  const { toast } = useToast();

  // Update the query to include project reviews
  const { data: projects = [], isLoading } = useQuery<(Project & { reviews: ProjectReview[] })[]>({
    queryKey: ["/api/projects"]
  });

  const uploadMediaMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to upload media");
      }
      return response.json();
    },
    onSuccess: (data) => {
      const fileUrl = data.file.url;
      const fileType = data.file.type;

      if (fileType === "image") {
        setUploadedImages(prev => [...prev, fileUrl]);
      } else if (fileType === "video") {
        setUploadedVideos(prev => [...prev, fileUrl]);
      } else if (fileType === "screenshot") {
        setUploadedScreenshots(prev => [...prev, fileUrl]);
      }
      toast({
        title: "Success",
        description: "Media uploaded successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to upload media",
        variant: "destructive",
      });
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: async (projectData: InsertProject) => {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create project");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      // Reset form and uploaded media arrays
      setUploadedImages([]);
      setUploadedVideos([]);
      setUploadedScreenshots([]);
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

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    formData.append("category", "project");

    uploadMediaMutation.mutate(formData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Convert tech stack string to array
    const techStackString = formData.get("techStack") as string;
    const techStack = techStackString.split(",").map(tech => tech.trim());

    // Create the project data
    const projectData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      longDescription: formData.get("longDescription") as string,
      category: selectedCategory,
      techStack,
      imageUrls: uploadedImages,
      videoUrls: uploadedVideos,
      screenshots: uploadedScreenshots,
      demoUrl: formData.get("demoUrl") as string || null,
      githubUrl: formData.get("githubUrl") as string || null,
    };

    createProjectMutation.mutate(projectData);
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

              {/* Media Upload Section */}
              <div className="col-span-2 space-y-4">
                <h3 className="text-lg font-medium">Media</h3>

                {/* Main Image */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Main Images</label>
                  <div className="flex gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleMediaUpload(e, "image")}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      disabled={uploadMediaMutation.isPending}
                      onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                    >
                      {uploadMediaMutation.isPending ? "Uploading..." : "Upload Image"}
                    </Button>
                  </div>
                  {/* Preview uploaded images */}
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {uploadedImages.map((url, index) => (
                      <div key={url} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img src={url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setUploadedImages(prev => prev.filter(i => i !== url))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Videos */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Videos</label>
                  <div className="flex gap-4">
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleMediaUpload(e, "video")}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      disabled={uploadMediaMutation.isPending}
                    >
                      {uploadMediaMutation.isPending ? "Uploading..." : "Upload Video"}
                    </Button>
                  </div>
                  {/* Preview uploaded videos */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {uploadedVideos.map((url, index) => (
                      <div key={url} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <video src={url} controls className="w-full h-full object-cover" />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setUploadedVideos(prev => prev.filter(i => i !== url))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Screenshots */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Screenshots</label>
                  <div className="flex gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        Array.from(e.target.files || []).forEach(file => {
                          const formData = new FormData();
                          formData.append("file", file);
                          formData.append("type", "screenshot");
                          formData.append("category", "project");
                          uploadMediaMutation.mutate(formData);
                        });
                      }}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      disabled={uploadMediaMutation.isPending}
                    >
                      {uploadMediaMutation.isPending ? "Uploading..." : "Upload Screenshots"}
                    </Button>
                  </div>
                  {/* Preview uploaded screenshots */}
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {uploadedScreenshots.map((url, index) => (
                      <div key={url} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img src={url} alt={`Screenshot ${index + 1}`} className="w-full h-full object-cover" />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setUploadedScreenshots(prev => prev.filter(i => i !== url))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
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

      {/* Reviews Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Project Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Add Review Form */}
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.currentTarget;
                        const formData = new FormData(form);

                        try {
                          const response = await fetch(`/api/projects/${project.id}/reviews`, {
                            method: "POST",
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              customerName: formData.get("customerName") as string,
                              customerCompany: formData.get("customerCompany") as string || null,
                              customerAvatar: formData.get("customerAvatar") as string || null,
                              rating: parseInt(formData.get("rating") as string),
                              review: formData.get("review") as string,
                            }),
                          });

                          if (!response.ok) {
                            throw new Error("Failed to add review");
                          }

                          queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
                          form.reset();
                          toast({
                            title: "Success",
                            description: "Review added successfully",
                          });
                        } catch (error) {
                          toast({
                            title: "Error",
                            description: error instanceof Error ? error.message : "Failed to add review",
                            variant: "destructive",
                          });
                        }
                      }}
                      className="space-y-4"
                    >
                      <input type="hidden" name="projectId" value={project.id} />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Customer Name</label>
                          <Input name="customerName" required />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Company</label>
                          <Input name="customerCompany" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Avatar URL</label>
                        <Input name="customerAvatar" type="url" placeholder="https://example.com/avatar.jpg" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Rating (1-5)</label>
                        <Select name="rating" defaultValue="5">
                          <SelectTrigger>
                            <SelectValue placeholder="Select rating" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <SelectItem key={rating} value={rating.toString()}>
                                {rating} Star{rating !== 1 ? 's' : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Review</label>
                        <Textarea name="review" required />
                      </div>
                      <Button type="submit">Add Review</Button>
                    </form>

                    {/* Existing Reviews */}
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-4">Existing Reviews</h4>
                      <div className="space-y-4">
                        {project.reviews?.map((review) => (
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}