// ============================================================
// CENTRALIZED DATA — edit this file to customize your portfolio
// ============================================================
import profileImg from "../assets/profile.png";

export const personal = {
  name: "Rathana Sokha",
  firstName: "Rathana",
  lastName: "Sokha",
  title: "Full-Stack Developer & Software Engineer",
  // tagline: "Crafting digital experiences that balance form and function.",
  bio: `I'm a full-stack developer with 5+ years of experience building scalable web applications and thoughtful user interfaces. I believe great software is built at the intersection of clean engineering and intentional design.`,
  longBio: `With a background spanning both engineering and design, I bring a holistic perspective to every project. I specialize in React ecosystems, Node.js backends, and creating interfaces that feel as good as they work. Currently open to exciting opportunities and collaborations.`,
  philosophy: `I write code the same way I design — with intention. Every line should serve a purpose, every component should earn its place. I value simplicity, clarity, and the kind of craftsmanship that users feel even when they can't quite explain it.`,
  location: "San Francisco, CA",
  email: "rathanasokha26@gmail.com",
  phone: "+855 889 920 309",
  availability: true,
  availabilityText: "Open to opportunities",
  cvUrl: "#",
  avatar: profileImg,
  social: {
    github: "https://github.com/Rathana-SOKHA",
    linkedin: "https://linkedin.com",
    telegram: "https://t.me/rathana_sokha",
    twitter: "https://twitter.com",
    facebook: "https://facebook.com",
  },
  facts: [
    { icon: "Coffee", label: "Cups of coffee per day", value: "3–4" },
    { icon: "Code2", label: "Lines of code written", value: "500k+" },
    { icon: "Globe", label: "Countries worked with clients", value: "12" },
    { icon: "Star", label: "GitHub stars earned", value: "2.4k" },
  ],
};

export const skills = [
  {
    category: "Frontend Development",
    icon: "Monitor",
    items: [
      { name: "React / Next.js", level: 90 },
      { name: "Vue.js", level: 90},
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 90},
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML5 & CSS3", level: 95 },
    ],
  },
  {
    category: "Backend Development",
    icon: "Server",
    items: [
      { name: "Node.js / Express", level: 90 },
      { name: "Laravel / PHP", level: 90},
      { name: "Java / Sprint Boot", level: 50},
      { name: "Python / FastAPI", level: 70 },
      { name: "Go", level: 40 },
      { name: "REST API Design", level: 90 },
    ],
  },
  {
    category: "Programming Languages",
    icon: "Code2",
    items: [
      { name: "JavaScript / TypeScript", level: 95 },
      { name: "Python", level: 72 },
      { name: "Go", level: 55 },
      { name: "SQL", level: 82 },
    ],
  },
  {
    category: "Frameworks & Libraries",
    icon: "Layers",
    items: [
      { name: "React Query / Zustand", level: 88 },
      { name: "Prisma / TypeORM", level: 80 },
      { name: "Jest / Testing Library", level: 78 },
      { name: "Storybook", level: 70 },
    ],
  },
  {
    category: "Database & Tools",
    icon: "Database",
    items: [
      { name: "MySQL", level: 95},
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 78 },
      { name: "Redis", level: 70 },
      { name: "Docker / CI/CD", level: 75 },
    ],
  },
  {
    category: "UI/UX Design",
    icon: "Palette",
    items: [
      { name: "Figma", level: 85 },
      { name: "Design Systems", level: 80 },
      { name: "Prototyping", level: 78 },
      { name: "User Research", level: 65 },
    ],
  },
];

export type ProjectCategory = "All" | "Web App" | "Mobile" | "Open Source" | "Design";

export const projects = [
  {
    id: 1,
    title: "Sun and Moon Laundry Service",
    description:
      "A comprehensive analytics dashboard for SaaS businesses. Features real-time data visualization, team collaboration tools, and an AI-powered insights engine.",
    category: "Web App" as ProjectCategory,
    featured: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    tags: ["React.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "CI/CD"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "IT Asset & Invontory Management System ",
    description:
      "An open-source component library and design system built for scalability. Includes 60+ components, Figma integration, and comprehensive documentation.",
    category: "Open Source" as ProjectCategory,
    featured: true,
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop",
    tags: ["React.js", "TypeScript", "Laravel", "MySQL", "Docker", "CI/CD"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Freelancer Marketplace",
    description:
      "A mobile-first travel planning application with offline support, collaborative itinerary building, and intelligent recommendations based on past trips.",
    category: "Web" as ProjectCategory,
    featured: true,
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=500&fit=crop",
    tags: ["React.js", "TypeScript", "Node.js", "Express.js", "Prisma", "MySQL", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "PNC Student Selection Management System",
    description:
      "A health and fitness tracking platform with habit streaks, nutrition logging, and personalized coaching. Integrates with wearable devices.",
    category: "Web App" as ProjectCategory,
    featured: false,
    image: "https://images.unsplash.com/photo-1575389430958-f06c655da0ab?w=800&h=500&fit=crop",
    tags: ["Laravel", "Vue.js", "TypeScript", "Tailwind", "MySQL", "JWT"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Clearning Service Web Application",
    description:
      "A drag-and-drop portfolio builder that generates blazing-fast static sites. Supports custom domains, analytics, and password-protected pages.",
    category: "Web App" as ProjectCategory,
    featured: false,
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop",
    tags: ["Node.js", "Express.js", "React.js", "Tailwindcss", "MySQL", "TypeORM"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "E-Commerice Management System",
    description:
      "Complete brand identity design for a creative agency. Includes logo, typography system, color palette, and comprehensive brand guidelines.",
    category: "Web" as ProjectCategory,
    featured: true,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
    tags: ["Laravel Blade", "Vue.js", "TypeScript", "Tailwindcss", "MySQL", "OAuth", "Telegram bot"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

export const education = [
  {
    id: 1,
    institution: "University of California, Berkeley",
    degree: "Bachelor of Science",
    field: "Computer Science",
    start: "2015",
    end: "2019",
    gpa: "3.8 / 4.0",
    achievements: ["Dean's List (All Semesters)", "Best Senior Project Award"],
    description:
      "Focused on software engineering, algorithms, and human-computer interaction. Completed senior thesis on adaptive UI systems.",
    logo: "🎓",
  },
  {
    id: 2,
    institution: "Google UX Design Certificate",
    degree: "Professional Certificate",
    field: "UX Design",
    start: "2020",
    end: "2020",
    gpa: "",
    achievements: ["Completed with Distinction"],
    description:
      "Intensive program covering the full design process — research, wireframing, prototyping, and usability testing.",
    logo: "🎨",
  },
  {
    id: 3,
    institution: "AWS Certified Solutions Architect",
    degree: "Professional Certification",
    field: "Cloud Architecture",
    start: "2021",
    end: "2021",
    gpa: "",
    achievements: ["Associate Level", "Score: 920 / 1000"],
    description:
      "Demonstrated expertise in designing distributed systems and deploying scalable applications on AWS infrastructure.",
    logo: "☁️",
  },
];

export const experience = [
  {
    id: 1,
    company: "THE LUMINIX CO., LTD.",
    role: "Enterprise Applications & Software Development Engineer",
    type: "Intership",
    start: "1 Sep 2026",
    end: "Present",
    location: "Chroy Changvar, Phnom Penh, Cambodia.",
    description:
      "Leading frontend architecture for the Next.js dashboard and developer tooling products. Working closely with the design and DevEx teams.",
    responsibilities: [
      "Led rewrite of the deployment dashboard — reduced load time by 60%.",
      "Architected a new component library adopted across 4 product teams.",
      "Mentored 3 junior engineers and ran bi-weekly frontend office hours.",
      "Collaborated with design to build a fully accessible UI token system.",
    ],
    technologies: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Laravel/PHP"],
  },
  {
    id: 2,
    company: "Stripe",
    role: "Software Engineer II",
    type: "Full-time",
    start: "2020",
    end: "2022",
    location: "San Francisco, CA",
    description:
      "Worked on the Stripe Dashboard, focusing on the financial reporting and data visualization surfaces used by millions of merchants.",
    responsibilities: [
      "Built the new Revenue Recognition module from scratch.",
      "Improved chart rendering performance by 40% via virtualization.",
      "Drove adoption of TypeScript across the dashboard codebase.",
      "Participated in Stripe's internal design system working group.",
    ],
    technologies: ["React", "TypeScript", "D3.js", "Ruby on Rails", "PostgreSQL"],
  },
  {
    id: 3,
    company: "Figma",
    role: "Frontend Engineer (Contract)",
    type: "Contract",
    start: "2019",
    end: "2020",
    location: "San Francisco, CA",
    description:
      "Contributed to the Figma web platform and plugin ecosystem during a high-growth period. Worked with the editor team on performance improvements.",
    responsibilities: [
      "Optimized canvas rendering for large design files.",
      "Developed internal tooling for the plugin review workflow.",
      "Improved editor keyboard shortcut accessibility.",
    ],
    technologies: ["TypeScript", "WebGL", "React", "Rust/WASM"],
  },
  {
    id: 4,
    company: "Freelance",
    role: "Full-Stack Developer & Designer",
    type: "Freelance",
    start: "2017",
    end: "2019",
    location: "Remote",
    description:
      "Designed and developed web products for startups and small businesses across e-commerce, SaaS, and media verticals.",
    responsibilities: [
      "Delivered 20+ projects across e-commerce, SaaS, and media.",
      "Built custom CMS solutions and headless e-commerce storefronts.",
      "Provided UX consulting and design system workshops.",
    ],
    technologies: ["React", "Node.js", "Shopify", "WordPress", "Figma"],
  },
];
