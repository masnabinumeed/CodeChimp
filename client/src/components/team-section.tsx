import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    name: "Muneeb Ur Rehman",
    role: "Chief Executive Officer",
    image: "uploads/Muneeb.jpg",
    description:
      "Visionary leader with over a decade of experience in driving innovation, scaling startups, and delivering impactful digital solutions.",
    expertise: [
      "Business Strategy",
      "Technology Leadership",
      "Product Innovation",
      "Scaling Startups",
    ],
  },
  {
    name: "Talha Baig",
    role: "Director of Engineering",
    image: "uploads/talha.jpg",
    description:
      "Engineering leader with a proven track record in designing scalable systems and managing high-performance teams across global projects.",
    expertise: [
      "Software Architecture",
      "System Design",
      "Cloud Infrastructure",
      "Ex-Afiniti and FedEx",
    ],
  },
  {
    name: "Ahmed Nasir",
    role: "Technology and AI Advisor",
    image: "uploads/ahmed.jpg",
    description:
      "Advisor with extensive experience in building secure, scalable architectures and leading technology innovation in AI and cloud computing.",
    expertise: [
      "Technical Strategy",
      "Scalable System Design",
      "AI & Cloud Computing",
      "Ex-Uber and Careem",
    ],
  },
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
              "flex flex-col items-center text-center",
            )}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-white mb-1">
              {member.name}
            </h3>
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
