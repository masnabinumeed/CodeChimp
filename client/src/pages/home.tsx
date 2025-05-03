import { Card, CardContent } from "@/components/ui/card";
import {
  Monitor,
  Smartphone,
  Globe,
  Brain,
  Code,
  CloudCog,
  ArrowRight,
  Star,
  MessageCircle,
  ChevronRight,
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
  SiOpenai,
  SiFigma,
  SiFirebase,
} from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Brain,
    title: "Smart solutions powered by AI & automation",
    description: "AI-driven applications and workflow automation",
    color: "from-orange-500 to-pink-500",
    iconBg: "bg-gradient-to-br from-orange-500/20 to-pink-500/20",
  },
  {
    icon: Globe,
    title: "Modern, responsive web applications",
    description: "Built with cutting-edge technologies",
    color: "from-blue-500 to-indigo-500",
    iconBg: "bg-gradient-to-br from-blue-500/20 to-indigo-500/20",
  },
  {
    icon: Monitor,
    title: "Powerful desktop applications",
    description: "For Windows, macOS, and Linux",
    color: "from-teal-500 to-emerald-500",
    iconBg: "bg-gradient-to-br from-teal-500/20 to-emerald-500/20",
  },
  {
    icon: Smartphone,
    title: "Native and cross-platform mobile apps",
    description: "For iOS and Android",
    color: "from-purple-500 to-violet-500",
    iconBg: "bg-gradient-to-br from-purple-500/20 to-violet-500/20",
  },
  {
    icon: Code,
    title: "Blockchain solutions, smart contracts",
    description: "And decentralized applications (dApps)",
    color: "from-yellow-500 to-amber-500",
    iconBg: "bg-gradient-to-br from-yellow-500/20 to-amber-500/20",
  },
  {
    icon: CloudCog,
    title: "Expert guidance on cloud infrastructure",
    description: "And DevOps practices",
    color: "from-red-500 to-rose-500",
    iconBg: "bg-gradient-to-br from-red-500/20 to-rose-500/20",
  },
];

const reviews = [
  {
    name: "PandaTechnologies",
    rating: 5,
    text: "Our collaboration has been transformational. Tech Monkeys understood our needs and delivered a solution that exceeded our expectations. The attention to detail and commitment to quality shines through in every aspect of the project.",
    image: "/uploads/panda.svg",
  },
  {
    name: "Rapid Innovations",
    rating: 5,
    text: "Tech Monkeys completely transformed our digital presence. Their team was responsive, professional, and delivered an exceptional product on time and within budget. We appreciate their expertise and innovative approach.",
    image: "/uploads/rapid.svg",
  },
  {
    name: "AnyBiz Worldwide",
    rating: 5,
    text: "Working with Tech Monkeys was a game-changer for our business. Their tech expertise and creativity helped us launch a platform that our customers love. The ongoing support has been incredible, making this a fantastic partnership.",
    image: "/uploads/anybiz.jpg",
  },
];

const projects = [
  {
    title: "CAR CONFIGURATOR",
    image: "/uploads/car-configurator.png",
    type: "3D Interactive Experience",
  },
  {
    title: "ADMIN DASHBOARD",
    image: "/uploads/admin-dashboard.png",
    type: "Data Visualization & Management",
  },
  {
    title: "CUSTOM CRM",
    image: "/uploads/crm.png",
    type: "Business Process Automation",
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

const floatingIcons = [
  { icon: <SiReact className="text-blue-400" />, position: "top-[10%] left-[10%]" },
  { icon: <SiOpenai className="text-green-400" />, position: "top-[20%] right-[15%]" },
  { icon: <SiTypescript className="text-blue-600" />, position: "top-[40%] left-[20%]" },
  { icon: <SiFigma className="text-purple-400" />, position: "bottom-[30%] right-[10%]" },
  { icon: <SiFirebase className="text-yellow-500" />, position: "bottom-[20%] left-[15%]" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Floating Icons */}
      {floatingIcons.map((icon, index) => (
        <div
          key={index}
          className={`absolute z-10 text-3xl opacity-70 animate-pulse ${icon.position}`}
          style={{ animationDelay: `${index * 0.5}s` }}
        >
          {icon.icon}
        </div>
      ))}

      {/* Header Section */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-black/0 to-transparent" />
        
        <div className="container mx-auto px-4 z-10 text-center pt-20">
          {/* Navigation Buttons */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg rounded-full px-1 py-1 flex gap-2 border border-white/20">
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 rounded-full text-xs">Home</Button>
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 rounded-full text-xs">About</Button>
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 rounded-full text-xs">Contact</Button>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto"
          >
            Your partners for <br/>
            the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">AI-first future</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-full font-medium hover:opacity-90 transition-all">
              Get in Touch
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white py-3 px-6 rounded-full font-medium hover:bg-white/20 transition-all border border-white/20">
              View Projects
            </button>
          </motion.div>
          
          {/* Project Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 mx-auto max-w-6xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <p className="text-xl md:text-2xl font-semibold mb-4">
                  We develop cutting-edge AI solutions for web, mobile, and desktop platforms to transform your ideas into reality.
                </p>
                <Link href="/projects">
                  <a className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                    View All Projects <ChevronRight size={16} className="ml-1" />
                  </a>
                </Link>
              </div>
              
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div 
                    key={project.title}
                    className="relative overflow-hidden rounded-lg border border-white/10 hover:border-purple-500/50 transition-all group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-black/30 opacity-60 group-hover:opacity-40 transition-opacity z-10" />
                    <img 
                      src={project.image || `/uploads/project-${index + 1}.jpg`} 
                      alt={project.title}
                      className="w-full object-cover h-32 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-between p-4 z-20">
                      <div>
                        <h3 className="font-bold text-white">{project.title}</h3>
                        <p className="text-xs text-white/70">{project.type}</p>
                      </div>
                      <Badge variant="outline" className="bg-black/50 backdrop-blur-sm">View</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative bg-black">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">
              Our Services
            </h2>
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
                <Card className="bg-purple-950/30 border-purple-900/50 hover:border-purple-500/50 transition-all overflow-hidden relative group h-full">
                  <CardContent className="pt-6">
                    <div className={`${service.iconBg} p-3 rounded-lg inline-block mb-4`}>
                      <service.icon className={`h-6 w-6 bg-gradient-to-br ${service.color} bg-clip-text text-transparent`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-400">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 relative bg-black">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">
              Why Choose Tech Monkeys
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="bg-purple-950/20 border border-purple-900/30 p-6 rounded-lg">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">10+</h3>
              <p className="text-gray-400">Years of Experience</p>
            </div>
            <div className="bg-purple-950/20 border border-purple-900/30 p-6 rounded-lg">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">250+</h3>
              <p className="text-gray-400">Completed Projects</p>
            </div>
            <div className="bg-purple-950/20 border border-purple-900/30 p-6 rounded-lg">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">50+</h3>
              <p className="text-gray-400">Satisfied Clients</p>
            </div>
            <div className="bg-purple-950/20 border border-purple-900/30 p-6 rounded-lg">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">24/7</h3>
              <p className="text-gray-400">Expert Support</p>
            </div>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {[SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, SiPostgresql, SiDocker].map((Icon, index) => (
              <div 
                key={index}
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                <Icon className="w-10 h-10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative bg-black">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">
              What our customers have to say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-purple-950/20 border border-purple-900/30 p-6 rounded-lg relative"
              >
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={review.image} />
                    <AvatarFallback>{review.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{review.name}</p>
                    <div className="flex">
                      {Array(review.rating).fill(0).map((_, i) => (
                        <Star key={i} size={12} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{review.text}</p>
                <div className="absolute -top-3 -left-3 text-purple-500 bg-black rounded-full p-1">
                  <MessageCircle size={24} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative bg-black">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Let us solve your next project
            </h2>
            <p className="text-gray-400 mb-8">
              Ready to turn your vision into reality? Let's start a conversation about your project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-full font-medium hover:opacity-90 transition-all">
                Get in Touch
              </button>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="inline-block p-3 rounded-full bg-purple-900/20 mb-3">
                  <img src="/uploads/Twitter.png" alt="Twitter" className="w-6 h-6" />
                </div>
                <p className="text-sm text-gray-500">Twitter</p>
              </div>
              <div className="text-center">
                <div className="inline-block p-3 rounded-full bg-purple-900/20 mb-3">
                  <img src="/uploads/Upwork.png" alt="Upwork" className="w-6 h-6" />
                </div>
                <p className="text-sm text-gray-500">Upwork</p>
              </div>
              <div className="text-center">
                <div className="inline-block p-3 rounded-full bg-purple-900/20 mb-3">
                  <img src="/uploads/Fiverr.png" alt="Fiverr" className="w-6 h-6" />
                </div>
                <p className="text-sm text-gray-500">Fiverr</p>
              </div>
              <div className="text-center">
                <div className="inline-block p-3 rounded-full bg-purple-900/20 mb-3">
                  <img src="/uploads/LinkedIn.png" alt="LinkedIn" className="w-6 h-6" />
                </div>
                <p className="text-sm text-gray-500">LinkedIn</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}