import { VideoBanner } from "@/components/video-banner";
import { Testimonials } from "@/components/testimonials";
import { Benefits } from "@/components/benefits";
import { Footer } from "@/components/footer";
import { ServiceCard } from "@/components/ui/service-card";
import { BulbIcon, MobileIcon, WifiIcon, ComputerIcon, EthIcon, SettingsIcon } from "@/components/icons";
import StackingCards, {StackingCardItem,} from "@/components/stacking-cards";

import {
  Monitor,
  Smartphone,
  Globe,
  Brain,
  Cloud,
  ChevronRight,
  Bitcoin,
  ArrowRight,
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

const services = [
  {
    icon: Brain,
    title: "AI & Automation Solutions",
    description: "Intelligent systems leveraging advanced AI and automated workflows.",
    illustration: BulbIcon
  },
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Dynamic web platforms crafted with modern frameworks and latest tools.",
    illustration: WifiIcon
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Custom mobile solutions for both iOS and Android platforms.",
    illustration: MobileIcon
  },
  {
    icon: Monitor,
    title: "Desktop Application Development",
    description: "Robust desktop software for Windows, macOS, and Linux systems.",
    illustration: ComputerIcon
  },
  {
    icon: Bitcoin,
    title: "Web3 & Crypto Development",
    description:
      "Decentralized systems, smart contracts, and blockchain applications.",
    illustration: EthIcon
  },

  {
    icon: Cloud,
    title: "Cloud & DevOps Consulting",
    description:
      "Professional support for cloud services and DevOps implementation.",
    illustration: SettingsIcon
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
    <div className="min-h-screen">
      <VideoBanner />

      <section
        id="projects"
        className=""
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          <motion.div className="md:sticky top-24 h-fit"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            >
            <h2 className="text-4xl  md:text-5xl  font-display mb-8 font-bold">
              We develop <span className="text-primary">cutting-edge</span> AI solutions for web, mobile, and desktop
              platforms to transform your <span className="text-primary">ideas into reality</span>
            </h2>
            {/* <div>
              <a href="/projects" className="btn-secondary">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div> */}
          </motion.div>

          <StackingCards totalCards={4}>
            <StackingCardItem index={0}  className="h-[450px] top-24">
            <div className="group h-full rounded-xl w-full bg-[url(https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=4256&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover ">
              <a href="" className="hidden group-hover:flex text-xl font-bold bg-background/60 w-full h-full justify-center items-center  transition-all duration-300">
                AI-Powered Chatbot Platform</a>
            </div>
            </StackingCardItem>

            <StackingCardItem index={1} className="h-[450px] top-24">
            <div className="group h-full rounded-lg w-full bg-[url(https://images.unsplash.com/photo-1642132652806-8aa09801c2ab?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover ">
              <a href="" className="hidden group-hover:flex text-xl font-bold bg-background/60 w-full h-full justify-center items-center  transition-all duration-300">
                E-Commerce Recommendation Engine</a>
            </div>
            </StackingCardItem>

            <StackingCardItem index={2} className="h-[450px] top-24">
            <div className="group h-full rounded-lg w-full bg-[url(https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=3850&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover border">
              <a href="" className="hidden group-hover:flex text-xl font-bold bg-background/60 w-full h-full justify-center items-center  transition-all duration-300">
                Mobile Health Tracker App</a>
            </div>
            </StackingCardItem>

            <StackingCardItem index={3} className="h-[450px] top-24">
            <div className="group h-full rounded-lg w-full bg-[url(https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover border">
              <a href="" className="hidden group-hover:flex text-xl font-bold bg-background/60 w-full h-full justify-center items-center  transition-all duration-300">
                Real-Time Collaboration Suite</a>
            </div>
            </StackingCardItem>
          </StackingCards>

        </div>
      </section>

      <section
        id="services"
        className=""
      >
        <div className="absolute inset-0 opacity-70" />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl uppercase font-bold mb-6 font-display">
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
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  illustration={service.illustration}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      
      <Benefits />
      <Testimonials />

      
      {/* <section className="py-24 relative overflow-hidden">
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
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
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
                            <Icon
                              className={`w-8 h-8 ${
                                index % 2 === 0
                                  ? "text-primary/60 group-hover:text-primary"
                                  : "text-secondary/60 group-hover:text-secondary"
                              } transition-colors`}
                            />
                            <span
                              className={`text-sm ${
                                index % 2 === 0
                                  ? "text-primary/80 group-hover:text-white"
                                  : "text-secondary/80 group-hover:text-white"
                              } transition-colors font-medium`}
                            >
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
      </section> */}

      <Footer />
      
    </div>
  );
}
