import { VideoBanner } from "@/components/video-banner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Monitor,
  Smartphone,
  Globe,
  Brain,
  Cloud,
  ChevronRight,
  Bitcoin,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
} from "react-icons/si";

import { LampContainer } from "@/components/ui/lamp";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Modern, responsive web applications built with cutting-edge technologies.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps for iOS and Android.",
  },
  {
    icon: Monitor,
    title: "Desktop Application Development",
    description: "Powerful desktop applications for Windows, macOS, and Linux.",
  },
  {
    icon: Bitcoin,
    title: "Web3 & Crypto Development",
    description:
      "Blockchain solutions, smart contracts, and decentralized applications (dApps).",
  },
  {
    icon: Brain,
    title: "AI & Automation Solutions",
    description: "Smart solutions powered by machine learning and automation.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Consulting",
    description:
      "Expert guidance on cloud infrastructure and DevOps practices.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <VideoBanner />

      <section id="services" className="py-24 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2NEgzNnpNNDAgMzBoNHY0aC00ek00NCAzNGg0djRoLTR6TTM0IDMwaDR2NGgtNHpNNDQgMzBoNHY0aC00ek0zMiAzNmg0djRoLTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent font-display">
              Our Services
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We deliver cutting-edge solutions tailored to your unique needs
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={item}>
                <Card className="group relative overflow-hidden border-none bg-white/5 backdrop-blur hover:bg-white/10 transition-all duration-300 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <CardHeader>
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full scale-150 blur-2xl group-hover:bg-primary/30 transition-colors duration-300" />
                      <service.icon className="h-12 w-12 text-primary relative" />
                    </div>
                    <CardTitle className="mt-4 text-xl text-white group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-display">
                  Why Choose Tech Monkeys?
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  We're a team of passionate developers and designers committed
                  to delivering exceptional software solutions. With years of
                  experience across multiple industries, we bring expertise and
                  innovation to every project.
                </p>
                <Link href="/projects">
                  <a className="inline-flex items-center group">
                    <span className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px]">
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-gradient-to-r from-primary via-secondary to-primary" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-900 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        View Our Projects
                        <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </span>
                  </a>
                </Link>
              </div>
              <div className="relative">
                <div className="absolute -inset-4">
                  <div className="w-full h-full mx-auto rotate-12 rounded-3xl bg-gradient-to-r from-primary to-secondary opacity-30 blur-3xl" />
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-black/70 backdrop-blur-sm p-8 ring-1 ring-primary/30">
                    <div className="flex flex-col h-full justify-between">
                      <div className="grid grid-cols-2 gap-6">
                        {[
                          { icon: SiReact, name: "React" },
                          { icon: SiTypescript, name: "TypeScript" },
                          { icon: SiTailwindcss, name: "Tailwind" },
                          { icon: SiNodedotjs, name: "Node.js" },
                          { icon: SiPostgresql, name: "PostgreSQL" },
                          { icon: SiDocker, name: "Docker" },
                        ].map(({ icon: Icon, name }, index) => (
                          <div
                            key={name}
                            className={`flex flex-col items-center gap-2 p-4 rounded-lg ${
                              index % 2 === 0 
                                ? "bg-primary/10 hover:bg-primary/20" 
                                : "bg-secondary/10 hover:bg-secondary/20"
                            } transition-colors group`}
                          >
                            <Icon className={`w-8 h-8 ${
                              index % 2 === 0 
                                ? "text-primary/60 group-hover:text-primary" 
                                : "text-secondary/60 group-hover:text-secondary"
                            } transition-colors`} />
                            <span className={`text-sm ${
                              index % 2 === 0 
                                ? "text-primary/80 group-hover:text-white" 
                                : "text-secondary/80 group-hover:text-white"
                            } transition-colors font-medium`}>
                              {name}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                          Built with modern technologies
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}