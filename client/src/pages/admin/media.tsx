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
import { Upload } from "lucide-react";
import type { MediaAsset } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";

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
      queryClient.invalidateQueries({ queryKey: ["/api/media"] });
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
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload New Media
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Media Type</label>
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
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
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
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">File</label>
              <div className="flex gap-4">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="flex-1"
                />
                <Button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadMutation.isPending}
                >
                  {uploadMutation.isPending ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </div>

            {uploadMutation.isPending && (
              <div className="text-sm text-muted-foreground">
                Uploading your file...
              </div>
            )}
          </form>
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

      {/* Media Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="aspect-video rounded-lg bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <Card key={asset.id} className="overflow-hidden">
              <div className="aspect-video relative">
                {asset.type === "video" ? (
                  <video
                    src={asset.url}
                    controls
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
              <CardContent className="p-4">
                <p className="font-medium truncate">{asset.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-muted-foreground capitalize">
                    {asset.type}
                  </span>
                  <span className="text-sm text-muted-foreground capitalize">
                    {asset.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}