import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Bot } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { MediaAsset } from "@shared/schema";
import { TeamSection } from "./team-section";

export function VideoBanner() {
  const { data: homeMedia = [] } = useQuery<MediaAsset[]>({
    queryKey: ["/api/media/home"]
  });

  const videoAsset = homeMedia.find(asset => asset.type === "video");
  const botIconAsset = homeMedia.find(asset => asset.type === "logo");

  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <video 
        autoPlay 
        muted 
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
        poster="https://images.unsplash.com/photo-1531297484001-80022131f5a1"
      >
        <source 
          src={videoAsset?.url || "https://static.videezy.com/system/resources/previews/000/051/958/original/code1291.mp4"} 
          type="video/mp4" 
        />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900" />

      <div className="relative container mx-auto px-4 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="flex items-center gap-4">
                {botIconAsset ? (
                  <img 
                    src={botIconAsset.url} 
                    alt="Tech Monkeys Logo" 
                    className="w-12 h-12 animate-bounce"
                  />
                ) : (
                  <Bot className="w-12 h-12 text-primary animate-bounce" />
                )}
                <span>
                  <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
                    Tech Monkeys
                  </span>
                </span>
              </span>
              Building Tomorrow's Technology Today
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-12 leading-relaxed">
              We craft innovative solutions across web, mobile, and desktop platforms to bring your ideas to life.
            </p>

            <div className="flex flex-wrap gap-6">
              <a 
                href="#services" 
                onClick={scrollToServices}
                className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-gradient-to-r from-primary via-purple-400 to-primary" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-900 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-colors hover:bg-gray-800">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </a>

              <Link href="/projects">
                <a className={cn(
                  "inline-flex items-center justify-center px-6 py-3 rounded-full",
                  "bg-white/10 backdrop-blur-lg text-white",
                  "hover:bg-white/20 transition-colors duration-300",
                  "border border-white/20 hover:border-white/40"
                )}>
                  View Projects
                </a>
              </Link>
            </div>
          </motion.div>
        </div>

        <TeamSection />

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/20 p-1"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-white/60 rounded-full mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}