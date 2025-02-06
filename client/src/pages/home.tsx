import { VideoBanner } from "@/components/video-banner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Smartphone, Globe, Brain, Cloud, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, responsive web applications built with cutting-edge technologies."
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps for iOS and Android."
  },
  {
    icon: Monitor,
    title: "Desktop Application Development",
    description: "Powerful desktop applications for Windows, macOS, and Linux."
  },
  {
    icon: Brain,
    title: "AI & Automation Solutions",
    description: "Smart solutions powered by machine learning and automation."
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Consulting",
    description: "Expert guidance on cloud infrastructure and DevOps practices."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
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
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
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
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                  Why Choose Tech Monkeys?
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  We're a team of passionate developers and designers committed to delivering 
                  exceptional software solutions. With years of experience across multiple 
                  industries, we bring expertise and innovation to every project.
                </p>
                <Link href="/projects">
                  <a className="inline-flex items-center group">
                    <span className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px]">
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-gradient-to-r from-primary via-purple-400 to-primary" />
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
                  <div className="w-full h-full mx-auto rotate-12 rounded-3xl bg-gradient-to-r from-primary to-purple-600 opacity-30 blur-3xl" />
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-gray-900 p-8 ring-1 ring-gray-800">
                    <div className="flex flex-col h-full space-y-6">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-4 rounded-full bg-gray-800 animate-pulse" style={{
                          width: `${85 - i * 15}%`,
                          animationDelay: `${i * 200}ms`
                        }} />
                      ))}
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