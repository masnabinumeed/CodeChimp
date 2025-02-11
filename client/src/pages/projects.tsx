import { useState } from "react";
import { ProjectCard } from "@/components/project-card";

const sampleProjects = [
  {
    id: 1,
    title: "TuneSphere",
    description:
      "Empowering global ECU optimization with seamless scalability and performance-driven solutions.",
    longDescription:
      "We developed a cutting-edge SaaS platform designed to deliver premium ECU tuning services, empowering clients with seamless performance optimization capabilities. At the heart of the solution is a robust WordPress plugin, crafted for effortless integration and scalability, enabling users to expand their offerings across diverse regions with ease. Our platform features a fully integrated payment system for smooth transactions and a comprehensive back-office portal, ensuring streamlined management of services, customer data, and regional operations. Built with scalability in mind, this solution empowers businesses to enhance efficiency, expand their market presence, and drive unparalleled value for their customers. Transform your ECU optimization services into a global powerhouse with this scalable and efficient SaaS platform.",
    category: "web",
    imageUrls: [
      "uploads/TuningX/1.PNG",
      "uploads/TuningX/2.PNG",
      "uploads/TuningX/3.PNG",
      "uploads/TuningX/4.PNG",
    ],
    screenshots: [],
    videoUrls: ["uploads/TuningX/1.mp4"],
    techStack: ["React", "Wordpress", "Laravel", "Stripe", "Docker"],
    demoUrl: "https://e-tuningfiles.com/configurator/",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 1,
        projectId: 1,
        name: "Koastas",
        rating: 5,
        comment:
          "Highly skilled professional team, their willingness to resolve issues exceeded expectations. The support was exceptionally fast, with quick and efficient responses.",
        date: "July 11, 2024",
        customerAvatar: "uploads/TuningX/Koastas.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Mobile Apps for Secure Networking",
    description:
      "Revolutionizing Secure Networking with Advanced Mobile App Solutions.",
    longDescription:
      "We partnered with Inside Packet Inc. to deliver cutting-edge iPhone and Android mobile applications, built to redefine secure networking experiences. Leveraging the power of the WireGuard SDK, we ensured seamless integration of high-performance VPN capabilities for superior encryption and privacy.Our expert team utilized Swift for iOS development and a hybrid approach with Java and Kotlin for Android, crafting intuitive, high-performance apps optimized for both platforms. The result: sleek, user-friendly mobile solutions that enable secure, reliable, and lightning-fast connections for end-users.Empowering Inside Packet Inc. with future-ready apps to lead the way in secure networking technology.",
    category: "mobile",
    imageUrls: [
      "uploads/InsidePacket/1.png",
      "uploads/InsidePacket/2.png",
      "uploads/InsidePacket/3.png",
      "uploads/InsidePacket/4.png",
    ],
    screenshots: [],
    videoUrls: ["uploads/InsidePacket/1.mp4"],
    techStack: ["Swift", "Firebase", "Java", "Kotlin"],
    demoUrl: "https://www.insidepacket.com/connecting-your-remote-workers/",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 2,
        projectId: 2,
        name: "Eli Karpilovski",
        rating: 4,
        comment:
          "These mobile applications set a new standard for secure and seamless connectivity, combining top-notch performance with intuitive user experiences.",
        date: "Feb 10, 2024",
        customerAvatar: "uploads/InsidePacket/Eli.jpeg",
      },
    ],
  },
  {
    id: 3,
    title: "Automated Delivery System for UEP Inc.",
    description:
      "Revolutionizing digital photo delivery with a seamless, automated system that boosts efficiency and enhances customer satisfaction.",
    longDescription:
      "We engineered an innovative Automated Delivery System for Universal Event Photography (UEP), transforming the way digital event photos are managed and delivered. Seamlessly integrating with tools like Google Docs, NAS storage, and Dropbox, this cutting-edge solution automates the entire workflow (from order processing to personalized file delivery) while providing real-time tracking and robust error recovery. Designed for scalability and precision, it eliminates manual effort, accelerates delivery times, and ensures a seamless customer experience. This system redefines operational efficiency, setting a new benchmark in the event photography industry.",
    category: "desktop",
    imageUrls: [
      "uploads/AutomatedPreOrderDelivery/1.webp",
      "uploads/AutomatedPreOrderDelivery/2.webp",
    ],
    screenshots: [],
    videoUrls: [],
    techStack: ["C#", "Google", "Dropbox", "WPF"],
    demoUrl: "https://www.uephd.com/",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 3,
        projectId: 3,
        name: "Colin Dunn",
        rating: 5,
        comment:
          "The automated delivery system exceeded our expectations, streamlining our workflows, reducing manual effort, and significantly enhancing our customer experience with faster, reliable photo deliveries.",
        date: "Sept 30, 2024",
        customerAvatar: "uploads/AutomatedPreOrderDelivery/1.ico",
      },
    ],
  },
  {
    id: 4,
    title: "Decentralized App for File Storage",
    description:
      "Decentralized P2P file-sharing with encrypted storage, powered by WebRTC and blockchain for unmatched security and scalability.",
    longDescription:
      "We developed a cutting-edge decentralized P2P file-sharing platform leveraging the power of WebRTC and Metered.ca's STUN/TURN servers for seamless peer-to-peer connectivity. This innovative solution includes a robust server application that offers encrypted, compressed storage as a service, rented in exchange for cryptocurrency, ensuring secure and scalable data management. Complementing this is the client application, designed to access and utilize this storage effortlessly, delivering unmatched performance and privacy. With end-to-end encryption, blockchain-powered transactions, and decentralized architecture, this platform redefines file-sharing by eliminating central points of failure and enhancing user autonomy. Built to empower the future of secure, scalable, and efficient digital data sharing.",
    category: "web3",
    imageUrls: [
      "uploads/P2pFileStorage/1.PNG",
      "uploads/P2pFileStorage/2.PNG",
      "uploads/P2pFileStorage/3.png",
    ],
    screenshots: [],
    videoUrls: [],
    techStack: ["Electron", "React", "Web3.js", "WebRTC"],
    demoUrl:
      "https://www.frynetworks.com/product-page/fry-storage-decentralization-node",
    githubUrl: "https://github.com/example/nft",
    reviews: [
      {
        id: 4,
        projectId: 4,
        name: "Samuel Fry",
        rating: 5,
        comment:
          "Exceptional developer! Delivered a flawless decentralized solution and exceeded expectations—looking forward to collaborating on more complex projects!",
        date: "Aug 8, 2024",
        customerAvatar: "uploads/P2pFileStorage/Samuel.jpeg",
      },
    ],
  },
];

const categories = [
  { value: "all", label: "All Projects" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "desktop", label: "Desktop" },
  { value: "web3", label: "Web3" },
];

export default function Projects() {
  const [category, setCategory] = useState("all");

  const filteredProjects =
    category === "all"
      ? sampleProjects
      : sampleProjects.filter((project) => project.category === category);

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Our Projects</h1>

        <div className="flex gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                category === cat.value
                  ? "bg-primary text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              reviews={project.reviews}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
