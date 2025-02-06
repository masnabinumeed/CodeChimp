import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2, Star, Plus, Edit } from "lucide-react";
import type { Project, InsertProject, ProjectReview } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";

const categories = [
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "desktop", label: "Desktop" }
];

interface ProjectFormData {
  project?: Project & { reviews?: ProjectReview[] };
  isOpen: boolean;
}

export default function ProjectManager() {
  const [formData, setFormData] = useState<ProjectFormData>({ isOpen: false });
  const [selectedCategory, setSelectedCategory] = useState<"web" | "mobile" | "desktop">("web");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);
  const [uploadedScreenshots, setUploadedScreenshots] = useState<string[]>([]);
  const { toast } = useToast();

  const { data: projects = [], isLoading } = useQuery<(Project & { reviews: ProjectReview[] })[]>({
    queryKey: ["/api/projects"]
  });

  // Reset form data when dialog is closed
  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setFormData({ isOpen: false });
      setUploadedImages([]);
      setUploadedVideos([]);
      setUploadedScreenshots([]);
      setSelectedCategory("web");
    }
  };

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
      handleDialogChange(false);
      toast({
        title: "Success",
        description: "Project saved successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save project",
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("type", type);
    formData.append("category", "project");

    try {
      uploadMediaMutation.mutate(formData);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Convert tech stack string to array
    const techStackString = formData.get("techStack") as string;
    const techStack = techStackString.split(",").map(tech => tech.trim());

    // Get existing URLs for the project if editing
    const existingProject = formData.project;

    // Create the project data
    const projectData = {
      ...(existingProject?.id ? { id: existingProject.id } : {}),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      longDescription: formData.get("longDescription") as string,
      category: selectedCategory,
      techStack,
      imageUrls: [...uploadedImages, ...(existingProject?.imageUrls || [])],
      videoUrls: [...uploadedVideos, ...(existingProject?.videoUrls || [])],
      screenshots: [...uploadedScreenshots, ...(existingProject?.screenshots || [])],
      demoUrl: formData.get("demoUrl") as string || null,
      githubUrl: formData.get("githubUrl") as string || null,
    };

    const endpoint = existingProject?.id 
      ? `/api/projects/${existingProject.id}`
      : "/api/projects";

    const method = existingProject?.id ? "PATCH" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `Failed to ${existingProject?.id ? 'update' : 'create'} project`);
      }

      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      handleDialogChange(false);
      toast({
        title: "Success",
        description: `Project ${existingProject?.id ? 'updated' : 'created'} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save project",
        variant: "destructive",
      });
    }
  };

  const removeImage = (url: string, isExisting: boolean = false) => {
    if (isExisting && formData.project) {
      const updatedProject = {
        ...formData.project,
        imageUrls: formData.project.imageUrls.filter(i => i !== url)
      };
      setFormData({ ...formData, project: updatedProject });
    } else {
      setUploadedImages(prev => prev.filter(i => i !== url));
    }
  };

  const removeVideo = (url: string, isExisting: boolean = false) => {
    if (isExisting && formData.project) {
      const updatedProject = {
        ...formData.project,
        videoUrls: formData.project.videoUrls.filter(v => v !== url)
      };
      setFormData({ ...formData, project: updatedProject });
    } else {
      setUploadedVideos(prev => prev.filter(v => v !== url));
    }
  };

  const removeScreenshot = (url: string, isExisting: boolean = false) => {
    if (isExisting && formData.project) {
      const updatedProject = {
        ...formData.project,
        screenshots: formData.project.screenshots.filter(s => s !== url)
      };
      setFormData({ ...formData, project: updatedProject });
    } else {
      setUploadedScreenshots(prev => prev.filter(s => s !== url));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Project Manager</h1>
        <Button onClick={() => setFormData({ isOpen: true })}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3].map((n) => (
            <div key={n} className="h-[300px] rounded-lg bg-gray-100 animate-pulse" />
          ))
        ) : (
          projects.map((project) => (
            <Card key={project.id}>
              <div className="aspect-video relative overflow-hidden">
                {project.imageUrls[0] && (
                  <img
                    src={project.imageUrls[0]}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
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
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4" />
                    {project.reviews?.length || 0} Reviews
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({ project, isOpen: true })}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Project Form Dialog */}
      <Dialog open={formData.isOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {formData.project ? `Edit ${formData.project.title}` : 'Create New Project'}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Project Details</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-6">
              <TabsContent value="details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Title</label>
                    <Input
                      name="title"
                      required
                      defaultValue={formData.project?.title}
                      placeholder="Enter project title"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
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
                    <Input
                      name="description"
                      required
                      defaultValue={formData.project?.description}
                      placeholder="Brief project description"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tech Stack</label>
                    <Input
                      name="techStack"
                      required
                      defaultValue={formData.project?.techStack.join(", ")}
                      placeholder="React, Node.js, PostgreSQL (comma-separated)"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Demo URL</label>
                    <Input
                      name="demoUrl"
                      defaultValue={formData.project?.demoUrl || ""}
                      placeholder="https://demo.example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">GitHub URL</label>
                    <Input
                      name="githubUrl"
                      defaultValue={formData.project?.githubUrl || ""}
                      placeholder="https://github.com/example/project"
                    />
                  </div>

                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium">Long Description</label>
                    <Textarea
                      name="longDescription"
                      defaultValue={formData.project?.longDescription || ""}
                      placeholder="Detailed project description with features and technical details"
                      className="min-h-[200px]"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="media">
                <div className="space-y-6">
                  {/* Main Images */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Main Images</label>
                    <div className="flex gap-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "image")}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        disabled={uploadMediaMutation.isPending}
                      >
                        {uploadMediaMutation.isPending ? "Uploading..." : "Upload Image"}
                      </Button>
                    </div>
                    {/* Preview grid for uploaded and existing images */}
                    <div className="grid grid-cols-4 gap-4 mt-4">
                      {[
                        ...uploadedImages.map(url => ({ url, isExisting: false })),
                        ...(formData.project?.imageUrls || []).map(url => ({ url, isExisting: true }))
                      ].map(({ url, isExisting }) => (
                        <div key={url} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <img src={url} alt="Project image" className="w-full h-full object-cover" />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => removeImage(url, isExisting)}
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
                        onChange={(e) => handleFileUpload(e, "video")}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        disabled={uploadMediaMutation.isPending}
                      >
                        {uploadMediaMutation.isPending ? "Uploading..." : "Upload Video"}
                      </Button>
                    </div>
                    {/* Preview grid for uploaded and existing videos */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {[
                        ...uploadedVideos.map(url => ({ url, isExisting: false })),
                        ...(formData.project?.videoUrls || []).map(url => ({ url, isExisting: true }))
                      ].map(({ url, isExisting }) => (
                        <div key={url} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <video src={url} controls className="w-full h-full object-cover" />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => removeVideo(url, isExisting)}
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
                    {/* Preview grid for uploaded and existing screenshots */}
                    <div className="grid grid-cols-4 gap-4 mt-4">
                      {[
                        ...uploadedScreenshots.map(url => ({ url, isExisting: false })),
                        ...(formData.project?.screenshots || []).map(url => ({ url, isExisting: true }))
                      ].map(({ url, isExisting }) => (
                        <div key={url} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <img src={url} alt="Screenshot" className="w-full h-full object-cover" />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => removeScreenshot(url, isExisting)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-6">
                  {/* Add Review Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Add Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const form = e.currentTarget;
                          const formData = new FormData(form);

                          try {
                            // First upload the avatar if provided
                            let avatarUrl = null;
                            const avatarFile = (form.querySelector('input[name="avatar"]') as HTMLInputElement).files?.[0];

                            if (avatarFile) {
                              const avatarFormData = new FormData();
                              avatarFormData.append("file", avatarFile);
                              avatarFormData.append("type", "avatar");
                              avatarFormData.append("category", "project");

                              const uploadResponse = await fetch("/api/media/upload", {
                                method: "POST",
                                body: avatarFormData,
                              });

                              if (!uploadResponse.ok) {
                                throw new Error("Failed to upload avatar");
                              }

                              const { file } = await uploadResponse.json();
                              avatarUrl = file.url;
                            }

                            // Then submit the review with the avatar URL
                            const response = await fetch(`/api/projects/${formData.project?.id}/reviews`, {
                              method: "POST",
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                customerName: formData.get("customerName") as string,
                                customerCompany: formData.get("customerCompany") as string || null,
                                customerAvatar: avatarUrl,
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
                          <label className="text-sm font-medium">Avatar</label>
                          <Input
                            name="avatar"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file && file.size > 5 * 1024 * 1024) {
                                toast({
                                  title: "Error",
                                  description: "Avatar image must be less than 5MB",
                                  variant: "destructive",
                                });
                                e.target.value = '';
                              }
                            }}
                          />
                          <p className="text-sm text-muted-foreground">
                            Upload a profile picture (max 5MB)
                          </p>
                        </div>

                        <div className="space-y-2 mt-4">
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
                        <div className="space-y-2 mt-4">
                          <label className="text-sm font-medium">Review</label>
                          <Textarea name="review" required />
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Existing Reviews */}
                  {formData.project?.reviews && formData.project.reviews.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Existing Reviews</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {formData.project.reviews.map((review) => (
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
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDialogChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createProjectMutation.isPending}
                >
                  {createProjectMutation.isPending ? "Saving..." : "Save Project"}
                </Button>
              </div>
            </form>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}