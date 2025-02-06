import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import type { MediaAsset } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

const categories = [
  { value: "all", label: "All Media" },
  { value: "project", label: "Project Media" },
  { value: "home", label: "Home Page" },
  { value: "brand", label: "Brand Assets" }
];

const types = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
  { value: "logo", label: "Logo" }
];

export default function MediaManager() {
  const [category, setCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("image");
  const [selectedCategory, setSelectedCategory] = useState("project");
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: assets = [], isLoading } = useQuery<MediaAsset[]>({
    queryKey: [category === "all" ? "/api/media" : `/api/media/${category}`]
  });

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Media uploaded successfully",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to upload media",
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", selectedType);
    formData.append("category", selectedCategory);

    uploadMutation.mutate(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Media Manager</h1>

      {/* Upload Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload New Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {types.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.slice(1).map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="flex-1"
            />
          </div>

          {uploadMutation.isPending && (
            <div className="text-sm text-muted-foreground">Uploading...</div>
          )}
        </CardContent>
      </Card>

      {/* Media Browser */}
      <Tabs value={category} onValueChange={setCategory} className="mb-8">
        <TabsList>
          {categories.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="aspect-video rounded-lg bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <Card key={asset.id} className="overflow-hidden">
              {asset.type === "video" ? (
                <video
                  src={asset.url}
                  controls
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <img
                  src={asset.url}
                  alt={asset.name}
                  className="w-full aspect-video object-cover"
                />
              )}
              <CardContent className="p-4">
                <p className="font-medium">{asset.name}</p>
                <p className="text-sm text-muted-foreground capitalize">{asset.type}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}