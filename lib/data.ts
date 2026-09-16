// lib/data.ts — Single source of truth for all portfolio content

export const personalInfo = {
  name: "AKASH PANDEY",
  nameShort: "AP",
  title: "Full-Stack JavaScript Developer",
  subtitle: "React.js Developer • Backend Developer • Problem Solver",
  intro:
    "Full-Stack JavaScript Developer with approximately 1–2 years of professional experience building responsive and scalable web applications using React.js, JavaScript, TypeScript, Node.js, and Express.js.",
  email: "pandeyaakash7491@gmail.com",
  phone: "+91 8957447491",
  location: "Surat, Gujarat, India",
  // Update these with actual URLs when available
  linkedin: "https://www.linkedin.com/in/akash-🌱-pandey-6960842b1/",
  github: "https://github.com/PANDEYAKASH2002",
  resumePath: "/resume.pdf",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const experience = [
  {
    id: "cowberry",
    company: "Cowberry",
    role: "React.js Developer",
    location: "Surat, India",
    period: "July 2024 – Present",
    type: "Full-time",
    achievements: [
      "Developed and maintained a React.js employee location tracking application.",
      "Built responsive admin dashboards with live GPS tracking using Leaflet.js.",
      "Implemented Role-Based Access Control (RBAC) and full CRUD operations.",
      "Contributed to Node.js and Express.js backend API development.",
      "Implemented i18n support covering 22 Indian regional languages.",
      "Integrated RESTful and real-time APIs across the application.",
      "Used Redux Toolkit and Context API for scalable state management.",
      "Optimized application performance by reducing unnecessary re-renders.",
      "Built reusable and lazy-loaded component architecture.",
      "Ensured mobile responsiveness and cross-browser compatibility.",
    ],
  },
  {
    id: "gvclouds",
    company: "GvClouds Secure",
    role: "Frontend Developer Intern",
    location: "Noida, India",
    period: "September 2024 – February 2025",
    type: "Internship",
    achievements: [
      "Built responsive web applications using HTML5, CSS3 and JavaScript.",
      "Converted UI/UX designs into precise, functional interfaces.",
      "Worked on pixel-accurate interfaces ensuring design fidelity.",
      "Debugged and optimized existing applications for performance.",
      "Improved cross-device and cross-browser compatibility.",
      "Used Git and GitHub for version control, collaboration and code reviews.",
    ],
  },
];

export const skillCategories = [
  {
    id: "languages",
    label: "Languages",
    skills: ["JavaScript ES6+", "TypeScript", "HTML5", "CSS3"],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      "React.js",
      "Tailwind CSS",
      "Bootstrap",
      "CSS Modules",
      "Responsive Web Design",
      "Component-Based Architecture",
    ],
  },
  {
    id: "state",
    label: "State Management",
    skills: ["Redux Toolkit", "Redux", "Context API", "React Query"],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "API Integration",
      "CRUD",
      "Middleware",
      "Authentication",
      "Authorization",
    ],
  },
  {
    id: "database",
    label: "Database",
    skills: [
      "MySQL",
      "Prisma ORM",
      "Relational Database Design",
      "Database Queries",
      "Data Modeling",
    ],
  },
  {
    id: "maps",
    label: "Maps & Tracking",
    skills: [
      "Leaflet.js",
      "GPS Tracking",
      "Polyline Rendering",
      "Route Visualization",
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: ["Git", "GitHub", "Postman", "VS Code", "npm"],
  },
  {
    id: "deployment",
    label: "Deployment",
    skills: ["Linux", "Contabo VPS", "Nginx", "GoDaddy DNS", "SSL/TLS"],
  },
];

export const projects = [
  {
    id: "harappa",
    name: "Harappa Biosciences",
    tagline: "Multi-Panel E-Commerce Ecosystem",
    liveUrl: "https://harappabiosciences.com",
    githubUrl: null,
    description:
      "A full-stack e-commerce ecosystem consisting of three deeply integrated panels — Admin, Seller, and Customer — built for production at scale.",
    highlights: [
      "Three-panel ecosystem: Admin, Seller, Customer",
      "Product & inventory management system",
      "Order tracking & analytics dashboards",
      "Role-Based Access Control (RBAC)",
      "RESTful API architecture with Prisma ORM",
      "Independent production deployment on Contabo VPS",
      "Nginx reverse proxy + GoDaddy DNS + SSL/TLS",
    ],
    tech: [
      "React.js",
      "Redux Toolkit",
      "Context API",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Prisma",
      "MySQL",
      "REST APIs",
      "Nginx",
      "Linux",
      "SSL/TLS",
    ],
    type: "ecommerce",
  },
  {
    id: "lantern",
    name: "Lantern360",
    tagline: "Workforce Management & Employee Performance Platform",
    liveUrl: "https://lantern360.in",
    githubUrl: null,
    description:
      "A workforce visibility platform focused on employee attendance, real-time GPS tracking, task management, and performance monitoring with role-based UI.",
    highlights: [
      "Real-time GPS tracking with live polyline route visualization",
      "Interactive dashboards for attendance & performance",
      "Task assignment and multi-level approval workflows",
      "Leave management with HR & manager approvals",
      "Role-based protected routing and UI",
      "Leaflet.js optimization for map performance",
      "Independent production deployment",
    ],
    tech: [
      "React.js",
      "Redux Toolkit",
      "Context API",
      "Leaflet.js",
      "REST APIs",
      "Tailwind CSS",
      "Nginx",
      "Linux",
    ],
    type: "workforce",
  },
];

export const certification = {
  name: "Front-End Developer Certification",
  issuer: "Uncodemy",
  location: "Noida",
  period: "January 2024 – June 2024",
  description:
    "6-month intensive Front-End Bootcamp specializing in React.js, component-based architecture and modern web development practices.",
};

export const education = [
  {
    id: "msc",
    degree: "Master of Science (M.Sc.)",
    shortTitle: "M.Sc.",
    institution: "Siddharth University",
    period: "2023 – 2025",
    type: "Postgraduate Degree",
    stream: "Science & Technology",
    location: "Uttar Pradesh, India",
    grade: "Advanced Studies",
    description:
      "Advanced postgraduate studies focused on computational science, algorithms, software system design, and applied mathematical modeling.",
    highlights: [
      "Advanced computational logic & algorithmic problem solving",
      "Software system architecture and database design principles",
      "Independent technical projects & specialized scientific computing",
    ],
    subjects: ["Computational Science", "Algorithms", "System Analysis", "Applied Mathematics"],
  },
  {
    id: "bsc",
    degree: "Bachelor of Science (B.Sc.)",
    shortTitle: "B.Sc.",
    institution: "Deen Dayal Upadhyaya (DDU) Gorakhpur University",
    period: "2019 – 2022",
    type: "Undergraduate Degree",
    stream: "Physical & Computer Science",
    location: "Gorakhpur, India",
    grade: "Graduated",
    description:
      "Three-year undergraduate program building core foundation in computer applications, mathematical reasoning, and software fundamentals.",
    highlights: [
      "Core foundation in scientific computing, mathematics, and logic",
      "Data structures, programming paradigms, and quantitative analysis",
      "Graduated with strong technical and analytical aptitude",
    ],
    subjects: ["Physics", "Mathematics", "Computer Science", "Analytical Logic"],
  },
  {
    id: "xii",
    degree: "Class XII (Senior Secondary)",
    shortTitle: "12th",
    institution: "Good Shepherd English School (GSEB)",
    period: "2019",
    type: "Higher Secondary",
    stream: "Science Stream (PCM)",
    location: "Gujarat, India",
    grade: "Completed",
    description:
      "Higher secondary education with a rigorous concentration in Physics, Chemistry, and Mathematics (PCM).",
    highlights: [
      "Major in Physics, Chemistry, and Mathematics (PCM)",
      "Strong grounding in mathematical modeling & problem-solving",
      "Developed early interest in computational sciences and software",
    ],
    subjects: ["Physics", "Chemistry", "Mathematics", "English"],
  },
  {
    id: "x",
    degree: "Class X (Secondary School)",
    shortTitle: "10th",
    institution: "Good Shepherd English School (GSEB)",
    period: "2017",
    type: "Secondary School",
    stream: "General Curriculum",
    location: "Gujarat, India",
    grade: "Completed",
    description:
      "Comprehensive secondary education under GSEB emphasizing fundamentals in Mathematics, Science, and English.",
    highlights: [
      "Comprehensive foundational secondary education under GSEB",
      "Demonstrated academic excellence in Mathematics and Sciences",
      "Active participant in science exhibitions and extracurriculars",
    ],
    subjects: ["Mathematics", "Science", "Social Studies", "English"],
  },
];

export const developerSnapshot = [
  { label: "Experience", value: "1–2 Years" },
  { label: "Primary Focus", value: "Full-Stack JS" },
  { label: "Location", value: "Surat, Gujarat" },
  { label: "Current Role", value: "React.js Dev @ Cowberry" },
];
