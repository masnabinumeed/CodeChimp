import { VideoBanner } from "@/components/video-banner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Smartphone, Globe, Brain, Cloud } from "lucide-react";

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

export default function Home() {
  return (
    <div className="min-h-screen">
      <VideoBanner />
      
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.title} className="border-none shadow-lg">
                <CardHeader>
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Choose Tech Monkeys?</h2>
            <p className="text-lg text-muted-foreground">
              We're a team of passionate developers and designers committed to delivering 
              exceptional software solutions. With years of experience across multiple 
              industries, we bring expertise and innovation to every project.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
