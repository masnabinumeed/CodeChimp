import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Code2, Smartphone, Globe } from "lucide-react";

const services = [
  {
    name: "Web Development",
    icon: Globe,
    description: "Building responsive and scalable web applications using cutting-edge technologies."
  },
  {
    name: "Mobile Development",
    icon: Smartphone,
    description: "Creating native and cross-platform mobile apps that deliver exceptional user experiences."
  },
  {
    name: "Custom Solutions",
    icon: Code2,
    description: "Developing tailored software solutions to meet your unique business requirements."
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
        Our Services
      </motion.h2>

      <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory no-scrollbar">
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={cn(
              "min-w-[300px] snap-center bg-gray-900/50 backdrop-blur-sm rounded-xl p-6",
              "border border-white/10 hover:border-primary/50 transition-colors duration-300",
              "flex flex-col items-center text-center"
            )}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <service.icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">{service.name}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}