import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Full Stack Developer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
    description: "Specializes in React, Node.js, and cloud architecture. Led development of 20+ enterprise applications.",
    expertise: ["React", "Node.js", "AWS", "TypeScript"]
  },
  {
    name: "Sarah Johnson",
    role: "UI/UX Lead",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    description: "Award-winning designer with expertise in user research and interactive prototyping.",
    expertise: ["Figma", "User Research", "Motion Design", "Design Systems"]
  },
  {
    name: "Michael Rodriguez",
    role: "Backend Architect",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    description: "Cloud infrastructure expert specializing in scalable microservices and database optimization.",
    expertise: ["Cloud Architecture", "PostgreSQL", "Docker", "Kubernetes"]
  }
];

export function TeamSection() {
  return (
    <div className="mt-24 mb-12">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
      >
        Meet Our Tech Innovation Team
      </motion.h2>

      <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={cn(
              "min-w-[300px] snap-center bg-gray-900/50 backdrop-blur-sm rounded-xl p-6",
              "border border-white/10 hover:border-primary/50 transition-colors duration-300",
              "flex flex-col items-center text-center"
            )}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
            <p className="text-sm text-primary mb-4">{member.role}</p>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {member.description}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {member.expertise.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}