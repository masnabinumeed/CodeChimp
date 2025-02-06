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
import { Upload, Bot, Video, Image } from "lucide-react";
import type { MediaAsset } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";

const categories = [
  { value: "home", label: "Home Page" },
  { value: "project", label: "Projects" },
  { value: "brand", label: "Brand Assets" }
];

const types = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
  { value: "logo", label: "Logo" }
];

export default function MediaManager() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedType, setSelectedType] = useState("image");
  const [selectedCategory, setSelectedCategory] = useState("home");
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const botIconInputRef = useRef<HTMLInputElement>(null);
  const videoBannerInputRef = useRef<HTMLInputElement>(null);

  const { data: assets = [], isLoading } = useQuery<MediaAsset[]>({
    queryKey: [`/api/media/${activeTab}`]
  });

  // Get current home page media
  const homeVideo = assets.find(asset => asset.type === "video" && asset.category === "home");
  const botIcon = assets.find(asset => asset.type === "logo" && asset.category === "home");

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media"] });
      queryClient.invalidateQueries({ queryKey: ["/api/media/home"] });
      toast({
        title: "Success",
        description: "Media uploaded successfully",
      });
      // Reset all file inputs
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (botIconInputRef.current) botIconInputRef.current.value = "";
      if (videoBannerInputRef.current) videoBannerInputRef.current.value = "";
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to upload media",
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: string, category: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    formData.append("category", category);

    uploadMutation.mutate(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Media Manager</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          {categories.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {activeTab === "home" && (
        <div className="space-y-6">
          {/* Bot Icon Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Bot Icon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                  {botIcon ? (
                    <img src={botIcon.url} alt="Bot Icon" className="w-full h-full object-cover" />
                  ) : (
                    <Bot className="w-full h-full p-4 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex gap-4">
                    <Input
                      ref={botIconInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "logo", "home")}
                      className="hidden"
                    />
                    <Button 
                      onClick={() => botIconInputRef.current?.click()}
                      disabled={uploadMutation.isPending}
                      className="w-full"
                    >
                      {uploadMutation.isPending ? "Uploading..." : "Change Icon"}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Recommended size: 128x128px. PNG or SVG format preferred.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Video Banner Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video Banner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                  {homeVideo ? (
                    <video
                      src={homeVideo.url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex gap-4">
                  <Input
                    ref={videoBannerInputRef}
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e, "video", "home")}
                    className="hidden"
                  />
                  <Button 
                    onClick={() => videoBannerInputRef.current?.click()}
                    disabled={uploadMutation.isPending}
                    className="w-full"
                  >
                    {uploadMutation.isPending ? "Uploading..." : "Change Video"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Recommended format: MP4. Max file size: 10MB.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Media Grid for other categories */}
      {activeTab !== "home" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            [1, 2, 3].map((n) => (
              <div key={n} className="aspect-video rounded-lg bg-gray-100 animate-pulse" />
            ))
          ) : (
            assets.map((asset) => (
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
            ))
          )}
        </div>
      )}

      {/* Upload Section for non-home categories */}
      {activeTab !== "home" && (
        <Card className="mt-8">
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
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">File</label>
                <div className="flex gap-4">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => handleFileUpload(e, selectedType, activeTab)}
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
      )}
    </div>
  );
}