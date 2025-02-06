import { VideoBanner } from "@/components/video-banner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Smartphone, Globe, Brain, Cloud } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen">
      <VideoBanner />

      <section id="services" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-4"
          >
            Our Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16"
          >
            We deliver cutting-edge solutions tailored to your unique needs
          </motion.p>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={item}>
                <Card className="group relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:from-primary/10 transition-colors duration-300" />
                  <CardHeader>
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/10 rounded-full scale-150 blur-xl group-hover:bg-primary/20 transition-colors duration-300" />
                      <service.icon className="h-12 w-12 text-primary relative" />
                    </div>
                    <CardTitle className="mt-4 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Why Choose Tech Monkeys?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're a team of passionate developers and designers committed to delivering 
              exceptional software solutions. With years of experience across multiple 
              industries, we bring expertise and innovation to every project.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}