import { useState } from "react";
import { ProjectCard } from "@/components/project-card";

const sampleProjects = [
  {
    id: 8,
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
        id: 8,
        projectId: 8,
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
    id: 9,
    title: "Inner AI Screen Recorder",
    description:
      "Inner AI's Screen Recorder is a versatile application for macOS and Windows that captures screen and camera inputs simultaneously, including specific window recordings, enhancing content creation and productivity.",
    longDescription:
      "Inner AI, a Santa Monica-based company founded in 2021, has developed a comprehensive Screen Recorder application compatible with both macOS and Windows platforms. This tool enables users to record their screen and camera feeds simultaneously, offering flexibility to capture specific windows as needed. Designed to enhance productivity and streamline content creation, the application caters to professionals and creatives alike.​ In April 2024, Inner AI secured $2.4 million in seed funding from investors including Canary, Alexia Ventures, Crivo, and Newtopia VC, supporting the development of innovative solutions like the Screen Recorder.",
    category: "desktop",
    imageUrls: [
      "uploads/InnerAi/1.PNG",
      "uploads/InnerAi/2.PNG",
      "uploads/InnerAi/3.PNG",
      "uploads/InnerAi/4.PNG",
      "uploads/InnerAi/5.PNG",
      "uploads/InnerAi/6.PNG",
    ],
    screenshots: [],
    videoUrls: [],
    techStack: ["C#", "WPF", "Swift", "S3", "AWS"],
    demoUrl: "https://www.innerai.com/en/blog/how-to-record-meetings",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 9,
        projectId: 9,
        name: "Pedro Salles Leite",
        rating: 5,
        comment:
          "Tech Monkeys provides exceptional customer service and efficient deliveries, ensure our solutions keep running efficiently and more reliably.",
        date: "Sept 6, 2024",
        customerAvatar: "uploads/InnerAi/Pedro.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "VPN Apps for Secure Networking",
    description:
      "Revolutionizing Secure Networking with Advanced Desktop and Mobile App Solutions.",
    longDescription:
      "We partnered with Inside Packet Inc. to deliver cutting-edge iPhone and Android mobile applications, built to redefine secure networking experiences. Leveraging the power of the WireGuard SDK, we ensured seamless integration of high-performance VPN capabilities for superior encryption and privacy.Our expert team utilized Swift for iOS development and a hybrid approach with Java and Kotlin for Android, crafting intuitive, high-performance apps optimized for both platforms. The result: sleek, user-friendly mobile solutions that enable secure, reliable, and lightning-fast connections for end-users.Empowering Inside Packet Inc. with future-ready apps to lead the way in secure networking technology.",
    category: "mobile",
    imageUrls: [
      "uploads/InsidePacket/1.png",
      "uploads/InsidePacket/2.png",
      "uploads/InsidePacket/3.png",
      "uploads/InsidePacket/4.png",
      "uploads/InsidePacket/1.webp",
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
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
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
  {
    id: 5,
    title: "GiveItToMillie Laundry App",
    description:
      "On-demand laundry app for iOS/Android with real-time tracking and CleanCloud integration—fast, seamless, and built for customer convenience.",
    longDescription:
      "We created a full-featured, on-demand laundry solution tailored for the Bahamas, combining sleek mobile apps for iOS and Android with powerful backend integration via CleanCloud. Customers enjoy a modern, hassle-free experience—scheduling pickups, tracking orders in real time, and customizing services with ease. On the business side, the CleanCloud portal enables seamless management of operations, from inventory and delivery routes to customer preferences and order flow. Payments are securely processed through First Atlantic Commerce (FAC), ensuring fast, reliable, and locally supported transactions. This platform is built for growth, convenience, and trust—empowering laundry businesses to scale effortlessly while delivering exceptional service to their customers. Whether you're starting fresh or upgrading your existing operation, our solution turns everyday laundry into a world-class experience.",
    category: "mobile",
    imageUrls: ["uploads/MissMillie/1.jpg", "uploads/MissMillie/2.jpg"],
    screenshots: [],
    videoUrls: ["uploads/MissMillie/1.mp4"],
    techStack: ["Flutter", "React", "Laravel", "Digital Ocean"],
    demoUrl: "https://www.giveittomillie.com/",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 5,
        projectId: 5,
        name: "Miss Millie",
        rating: 5,
        comment: "Love Working with these guys! Super professional team.",
        date: "Jan 12, 2025",
        customerAvatar: "uploads/MissMillie/Alethia.jpg",
      },
    ],
  },
  {
    id: 6,
    title: "Decentralized VPN Solution",
    description:
      "A decentralized VPN app built on Electron, offering secure, anonymous browsing through peer-hosted servers with real-time stats and crypto-based subscriptions—eliminating central control for true internet freedom.",
    longDescription:
      "We built a decentralized VPN platform using Electron, combining privacy, performance, and crypto-powered access. Users connect to peer-hosted VPN servers with end-to-end encryption and real-time stats like speed, uptime, and location.Subscriptions are paid via cryptocurrency, ensuring anonymity and global accessibility. Server hosts earn crypto for sharing bandwidth, creating a self-sustaining, scalable network without central control. With a sleek cross-platform app and robust backend architecture, this VPN solution offers secure browsing, transparent performance tracking, and a decentralized approach to internet freedom.",
    category: "web3",
    imageUrls: [
      "uploads/VPNapp/1.PNG",
      "uploads/VPNapp/2.PNG",
      "uploads/VPNapp/3.PNG",
      "uploads/VPNapp/4.PNG",
      "uploads/VPNapp/5.PNG",
      "uploads/VPNapp/6.PNG",
      "uploads/VPNapp/7.PNG",
    ],
    screenshots: [],
    videoUrls: [],
    techStack: ["Electron", "React", "Web3.js", "Digital Ocean"],
    demoUrl: "https://www.frynetworks.com/bandwidth-miners",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 6,
        projectId: 6,
        name: "Samuel Fry",
        rating: 5,
        comment:
          "Awesome Team! Will continue to work with for very complex projects.",
        date: "May 16, 2024",
        customerAvatar: "uploads/P2pFileStorage/Samuel.jpeg",
      },
    ],
  },
  {
    id: 7,
    title: "Voice Master",
    description:
      "VoiceMaster is a powerful cross-platform app that lets you control your computer using voice commands, keyboard, mouse, and custom key combos—supporting all languages powered by Azure Speech.",
    longDescription:
      "VoiceMaster is an intelligent voice control app designed to streamline how users interact with their computers. Built for versatility, it supports voice commands, keyboard input, mouse actions, and key combinations for ultimate control. Powered by Microsoft Azure Speech Services, VoiceMaster supports voice recognition in all Azure-supported languages, making it accessible and adaptable across global user bases. Whether launching apps, executing shortcuts, or automating workflows, VoiceMaster delivers a seamless, multilingual voice experience—perfect for productivity, accessibility, and hands-free computing.",
    category: "desktop",
    imageUrls: [
      "uploads/VoiceMaster/1.webp",
      "uploads/VoiceMaster/2.webp",
      "uploads/VoiceMaster/3.webp",
      "uploads/VoiceMaster/4.webp",
      "uploads/VoiceMaster/5.webp",
    ],
    screenshots: [],
    videoUrls: [],
    techStack: ["C#", "Dotnet", "Azure Speech", "Angular"],
    demoUrl: "#",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 7,
        projectId: 7,
        name: "Kevin Lu",
        rating: 5,
        comment: "Excellent team with very prompt communication.",
        date: "May 14, 2024",
        customerAvatar: "uploads/VoiceMaster/KevenLu.webp",
      },
    ],
  },
  {
    id: 15,
    title: "Welfare Check Australia",
    description:
      "Welfare Check Australia is a WordPress-based platform powered by WooCommerce and Stripe, offering easy and secure online booking for welfare check services across Australia.",
    longDescription:
      "We developed Welfare Check Australia's online platform using WordPress, creating a clean, user-friendly website that makes booking welfare check services simple and efficient. The system is fully integrated with WooCommerce for managing services and scheduling, and uses Stripe for secure, seamless online payments. This solution enables customers to book welfare checks with confidence, while the business benefits from automated order management, flexible service listings, and real-time payment processing—all built on a reliable and scalable foundation.",
    category: "web",
    imageUrls: [
      "uploads/WelfareAustralia/1.PNG",
      "uploads/WelfareAustralia/2.PNG",
      "uploads/WelfareAustralia/3.PNG",
      "uploads/WelfareAustralia/4.PNG",
    ],
    screenshots: [],
    videoUrls: [],
    techStack: ["PHP", "Wordpress", "WooCommerce", "Stripe"],
    demoUrl: "https://www.welfarecheckaustralia.com/",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 15,
        projectId: 15,
        name: "Sal",
        rating: 5,
        comment: "This team gave me one of the best experience of fiverr.",
        date: "March 26, 2025",
        customerAvatar: "uploads/WelfareAustralia/Sal.jpg",
      },
    ],
  },
  {
    id: 16,
    title: "Image Mover for UEP Inc.",
    description:
      "Image Mover is a C# automation tool for UEP Inc. that monitors a hot folder, auto-sorts photos into event categories, and transfers reviewed images to NAS storage with structured team and event folders.",
    longDescription:
      "We developed Image Mover for UEP Inc., a C#-based desktop tool designed to streamline the photo management workflow. The app continuously watches a designated hot folder where images from cameras are automatically copied. Based on predefined categories, the photos are sorted into event-specific folders for easy organization and review. Once reviewed, selected images can be transferred to a NAS storage system with a structured hierarchy based on photographers' teams and event names. This solution ensures fast sorting, secure archiving, and consistent folder organization—perfect for high-volume event photography operations.",
    category: "desktop",
    imageUrls: ["uploads/ImageMover/1.PNG", "uploads/ImageMover/2.PNG"],
    screenshots: [],
    videoUrls: [],
    techStack: ["C#", "Windows Service", "WPF"],
    demoUrl: "https://www.uephd.com/",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 16,
        projectId: 16,
        name: "Colin Dunn",
        rating: 5,
        comment:
          "The automated delivery system exceeded our expectations, streamlining our workflows, reducing manual effort, and significantly enhancing our customer experience with faster, reliable photo deliveries.",
        date: "Oct 4, 2024",
        customerAvatar: "uploads/AutomatedPreOrderDelivery/1.ico",
      },
    ],
  },
  {
    id: 10,
    title: "Video Capture for UEP Inc.",
    description:
      "Video Capture is a C# automation tool for UEP Inc. that records real-time video from any camera via capture dongle and saves footage in event-based folders. Reviewed files are transferred to NAS storage organized by photographer and event.",
    longDescription:
      "We developed Video Capture for UEP Inc., a real-time video recording solution built in C#. The application captures high-quality footage from any camera connected via capture dongle, allowing for seamless recording and file management. Videos are automatically saved into organized event folders, with the option to review and send them to NAS storage. The folder structure follows a consistent hierarchy based on the event and the photographer capturing it, ensuring easy access, collaboration, and long-term archiving. Ideal for media teams and event documentation, this solution combines reliability, automation, and scalable storage.",
    category: "desktop",
    imageUrls: ["uploads/VideoCapture/1.PNG", "uploads/VideoCapture/2.PNG"],
    screenshots: [],
    videoUrls: [],
    techStack: ["C#", "Windows Service", "Win UI", "Advanced Installer"],
    demoUrl: "https://www.uephd.com/",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 10,
        projectId: 10,
        name: "Colin Dunn",
        rating: 5,
        comment:
          "We have worked multiple time with Tech Monkeys. They always step up to our standard.",
        date: "Jan 20, 2025",
        customerAvatar: "uploads/AutomatedPreOrderDelivery/1.ico",
      },
    ],
  },
  {
    id: 11,
    title: "Task Tally for Yesway.",
    description:
      "Task Tally is a productivity and time-tracking tool built for the Yes Way team, automating project monitoring, time logging, and generating insightful productivity charts for smarter decision-making.",
    longDescription:
      "We developed Task Tally as a custom productivity tool for the Yes Way team, focused on optimizing project oversight and team performance. The app enables real-time tracking of ongoing projects, logs time spent on tasks, and automatically generates visual productivity reports and charts. With its intuitive dashboard and automated data collection, Task Tally helps teams stay organized, analyze workload distribution, and improve time management—empowering data-driven decisions and boosting overall efficiency.",
    category: "desktop",
    imageUrls: [
      "uploads/TaskTally/1.PNG",
      "uploads/TaskTally/2.PNG",
      "uploads/TaskTally/3.PNG",
    ],
    screenshots: ["uploads/TaskTally/1.mp4"],
    videoUrls: [],
    techStack: ["C#", "Windows Service", "WPF", "Advanced Installer"],
    demoUrl: "#",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 11,
        projectId: 11,
        name: "Maik Montana",
        rating: 5,
        comment:
          "I love what Muneeb and his team achieved together. The app works exactly as expected. They followed my design guidelines nearly perfectly. I feel they tried their best to deliver an application that works. I was surprised by the very fast delivery. All I can say is good things. Well done!",
        date: "Jan 1, 2024",
        customerAvatar: "uploads/TaskTally/Yesway.webp",
      },
    ],
  },
  {
    id: 12,
    title: "Charitable",
    description:
      "Charitable is a React Native mobile app with a Laravel admin panel that streamlines charity onboarding and enables users to donate effortlessly through Stripe-powered payments.",
    longDescription:
      "We built Charitable as a cross-platform mobile app using React Native, paired with a Laravel-based admin panel to simplify the process of onboarding and managing charities. The app offers users a smooth, intuitive interface to discover verified causes and make secure donations directly from their phones. Charity administrators can easily manage profiles, campaigns, and donor insights through the backend panel. With Stripe integrated for payment processing, Charitable ensures fast, reliable, and secure transactions—empowering donors and nonprofit organizations with a modern, mobile-first experience.",
    category: "mobile",
    imageUrls: ["uploads/Charity/1.jpg"],
    screenshots: ["uploads/Charity/1.mp4", "uploads/Charity/2.mp4"],
    videoUrls: [],
    techStack: ["React Native", "Laravel", "React", "Stripe", "Digital Ocean"],
    demoUrl: "#",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 12,
        projectId: 12,
        name: "Nathan Pillay",
        rating: 5,
        comment: "Very professional team. Therir work was excellent.",
        date: "Nov 28, 2024",
        customerAvatar: "uploads/Charity/Nathan.jpg",
      },
    ],
  },
  {
    id: 13,
    title: "Life Style Access",
    description:
      "Lifestyle Access is a cross-platofrm mobile app with a Laravel admin panel that lets users explore venues, buy event tickets or club tables, while promoters can create events. Payments are securely handled via Stripe.",
    longDescription:
      "We developed Lifestyle Access as a modern Flutter-based mobile app that connects users to premium nightlife and event experiences. Users can log in, browse venues, purchase tickets, or reserve tables at exclusive clubs and events—all through a sleek, easy-to-use interface. Promoters have the ability to create and manage their own events, while the Laravel-powered admin panel provides full control over users, listings, and bookings. Integrated with Stripe, the app ensures secure, seamless payment processing for both guests and organizers. Lifestyle Access brings the nightlife scene to your fingertips—streamlined, stylish, and built for both event-goers and promoters.",
    category: "mobile",
    imageUrls: [
      "uploads/LifeStyleAccess/1.jpg",
      "uploads/LifeStyleAccess/2.jpg",
      "uploads/LifeStyleAccess/3.jpg",
      "uploads/LifeStyleAccess/4.jpg",
      "uploads/LifeStyleAccess/5.jpg",
      "uploads/LifeStyleAccess/6.jpg",
    ],
    screenshots: ["uploads/LifeStyleAccess/1.mp4"],
    videoUrls: [],
    techStack: ["Flutter", "Laravel", "React", "Stripe", "Digital Ocean"],
    demoUrl: "https://thelifestyleaccess.com/",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 13,
        projectId: 13,
        name: "Eljay Hardy",
        rating: 5,
        comment:
          "Looking for a long term partnership with Tech Monkeys team. They are very pro-active and deliver satisfactory solutions.",
        date: "Nov 28, 2024",
        customerAvatar: "uploads/LifeStyleAccess/Eljay.jpg",
      },
    ],
  },
  {
    id: 14,
    title: "Elbe Adventures",
    description:
      "Elbe Adventures is a WordPress-based travel site where we developed a custom plugin to integrate with the Regiondo API, automating and managing adventure tour bookings seamlessly.",
    longDescription:
      "We worked with Elbe Adventures to enhance their WordPress-based travel platform by developing a custom plugin that integrates directly with the Regiondo API. This integration automates the entire booking process—syncing availability, managing reservations, and streamlining customer interactions. The solution empowers Elbe Adventures to offer real-time booking for their tours and outdoor activities while reducing manual work and minimizing errors. With this custom automation, the business can scale efficiently and provide a smoother experience for both staff and customers.",
    category: "web",
    imageUrls: ["uploads/ElbeAdventurs/1.PNG"],
    screenshots: [],
    videoUrls: ["uploads/ElbeAdventurs/1.mp4"],
    techStack: ["PHP", "Wordpress", "Regiondo", "Stripe", "Digital Ocean"],
    demoUrl: "https://elbe-adventure.de/",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 14,
        projectId: 14,
        name: "Thomas",
        rating: 5,
        comment:
          "We've worked with this team many times and are always very satisfied with their performance and scope. We would recommend them at any time and are confident that we'll use them again for our next project. Thank you very much!",
        date: "Nov 4, 2024",
        customerAvatar: "uploads/ElbeAdventurs/Thomas.webp",
      },
    ],
  },
  {
    id: 1,
    title: "Enterprise-Grade E-Commerce Platform for Electronic Components",
    description:
      "We developed a large-scale, enterprise e-commerce solution featuring advanced component search, real-time inventory, and secure checkout—built using Laravel, Elasticsearch, WooCommerce, and Stripe.",
    longDescription:
      "For a leading electronics distribution platform based in Singapore, we engineered a comprehensive end-to-end e-commerce solution, inspired by features seen on sites like Mouser and Digi-Key. The backend is built on Laravel with Elasticsearch powering high-performance, intelligent product search across a massive catalog. On the frontend, we integrated WordPress with WooCommerce to manage products and customer interactions, while Stripe handles secure and scalable payment processing. This robust architecture supports real-time inventory, detailed technical filters, and smooth user experience—designed to handle large volumes of traffic and product data with ease.(Due to confidentiality agreements, specific client details cannot be disclosed.)",
    category: "web",
    imageUrls: [
      "uploads/Iconnexion/1.PNG",
      "uploads/Iconnexion/2.PNG",
      "uploads/Iconnexion/3.PNG",
      "uploads/Iconnexion/4.PNG",
      "uploads/Iconnexion/5.PNG",
      "uploads/Iconnexion/6.PNG",
    ],
    screenshots: [],
    videoUrls: [],
    techStack: [
      "PHP",
      "Wordpress",
      "Laravel",
      "Elasticsearch",
      "WooCommerce",
      "Stripe",
      "Digital Ocean",
    ],
    demoUrl: "#",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 1,
        projectId: 1,
        name: "Keith",
        rating: 5,
        comment:
          "Their professionalism and commitment to delivering high-quality work were evident throughout the engagement.",
        date: "Dec 14, 2024",
        customerAvatar: "uploads/Iconnexion/Keith.jpg",
      },
    ],
  },

  {
    id: 17,
    title: "DYF Investing",
    description:
      "We developed a secure, high-performance backend for a private investment analytics platform, delivering scalable infrastructure while preserving proprietary data visualizations and insights.",
    longDescription:
      "We collaborated on the backend development of a confidential investment analytics platform for a private client, focused on performance, scalability, and secure data handling. The system supports complex financial logic, dynamic dashboards, and investor tools while maintaining full compliance with modern security practices. All analytics models and data visualizations remain the intellectual property of the client, and details are under NDA. Our role was to engineer a robust, modular backend architecture that enables seamless growth and efficient data processing—powering a cutting-edge investment experience without disclosing proprietary mechanisms.",
    category: "web",
    imageUrls: [
      "uploads/DFYInvestment/1.jpg",
      "uploads/DFYInvestment/2.jpg",
      "uploads/DFYInvestment/3.jpg",
    ],
    screenshots: [],
    videoUrls: [],
    techStack: ["C#", "Dotnet", "React", "Azure"],
    demoUrl: "https://app.dyfinvesting.com/",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 17,
        projectId: 17,
        name: "Bryan Stockwell",
        rating: 5,
        comment:
          "Very professional and great to work with. Excellent communication and responsiveness!",
        date: "March 8, 2024",
        customerAvatar: "uploads/DFYInvestment/BryanStockwell.jpg",
      },
    ],
  },
  {
    id: 18,
    title: "Comment Manager",
    description:
      "Comment Manager is a custom tool built for Sparrow & Wayne that lets users upload Word documents, view all comments in one place, and interact with them—navigate, reply, and manage feedback with ease.",
    longDescription:
      "We developed Comment Manager for Sparrow & Wayne—a document collaboration tool that streamlines the review process for Word documents. Users can upload .docx files and instantly view all embedded comments in a centralized interface. Each comment is clickable, allowing users to jump directly to the comment location within the document. The tool also enables threaded replies and organized feedback management, making it ideal for editorial, legal, and collaborative review workflows. Designed for clarity and control, Comment Manager transforms static document reviews into an interactive and efficient experience.",
    category: "desktop",
    imageUrls: ["uploads/CommentManager/1.PNG"],
    screenshots: [],
    videoUrls: [],
    techStack: ["C#", "Dotnet", "wpf"],
    demoUrl: "#",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 18,
        projectId: 18,
        name: "Diogo",
        rating: 5,
        comment:
          "The delivery was perfect. More than we expected. For sure we will continue to work with Tech Monkeys. Thank you again.",
        date: "Jan 8, 2024",
        customerAvatar: "uploads/CommentManager/1.webp",
      },
    ],
  },
  {
    id: 19,
    title: "Notepad For Meetings",
    description:
      "A lightweight, customizable notepad tool for Mac that launches instantly via keyboard shortcuts, supports reusable templates, and simplifies note-taking with a clean, distraction-free interface.",
    longDescription:
      "We developed a minimal yet powerful notepad-style application for macOS, designed for fast, effortless note-taking. The app can be launched instantly using custom keyboard shortcuts, offering users a seamless way to jot down ideas without breaking workflow.It features built-in support for templates, allowing quick insertion of pre-defined formats for tasks like meeting notes, to-do lists, or logs. The shortcut keys are fully customizable to match each user’s preferences, making the app a flexible productivity companion for Mac users.Optimized for speed and simplicity, this tool is perfect for professionals who value quick access and structured note organization.",
    category: "desktop",
    imageUrls: [
      "uploads/NotesForMeetings/1.webp",
      "uploads/NotesForMeetings/2.webp",
      "uploads/NotesForMeetings/3.webp",
      "uploads/NotesForMeetings/4.webp",
      "uploads/NotesForMeetings/5.webp",
    ],
    screenshots: [],
    videoUrls: [],
    techStack: ["Swift"],
    demoUrl: "#",
    githubUrl: "https://github.com/orgs/TechMonkeys-io/repositories",
    reviews: [
      {
        id: 19,
        projectId: 19,
        name: "Vicente Hosie",
        rating: 5,
        comment: "Thank you so much! I'm very excited to use this application!",
        date: "Dec 21, 2023",
        customerAvatar: "uploads/NotesForMeetings/Vicent.webp",
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

        {/* <div className="flex gap-4 mb-8">
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
        </div> */}
      </div>
    </div>
  );
}
