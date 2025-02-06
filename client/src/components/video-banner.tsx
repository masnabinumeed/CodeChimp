import { cn } from "@/lib/utils";
import { Link } from "wouter";

export function VideoBanner() {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <video 
        autoPlay 
        muted 
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1531297484001-80022131f5a1"
      >
        <source 
          src="https://static.videezy.com/system/resources/previews/000/051/958/original/code1291.mp4" 
          type="video/mp4" 
        />
      </video>

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start">
        <h1 className="text-4xl md:text-6xl font-bold text-white max-w-2xl mb-6">
          Building Tomorrow's Technology Today
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-xl mb-8">
          We craft innovative solutions across web, mobile, and desktop platforms to bring your ideas to life.
        </p>
        <div className="flex gap-4">
          <a 
            href="#services"
            className={cn(
              "px-6 py-3 rounded-md bg-primary text-white font-medium",
              "hover:bg-primary/90 transition-colors"
            )}
          >
            Our Services
          </a>
          <Link 
            href="/projects"
            className={cn(
              "px-6 py-3 rounded-md bg-white text-primary font-medium",
              "hover:bg-gray-100 transition-colors"
            )}
          >
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}