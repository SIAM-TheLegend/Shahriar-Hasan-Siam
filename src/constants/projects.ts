export type ProjectTag = "Website" | "ReactJS" | "Next.js" | "React Native" | "UI/UX" | "Full Stack";

export interface Project {
  id: string;
  title: string;
  description: string;
  summary: string;
  tags: ProjectTag[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completedAt: string;
}

export const projectTags: ProjectTag[] = ["Website", "ReactJS", "Next.js", "React Native", "UI/UX", "Full Stack"];

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Modern E-commerce Platform",
    description: "A full-featured e-commerce platform built with Next.js, TypeScript, and Stripe integration. Features include product filtering, user authentication, shopping cart, and checkout process.",
    summary: "Full-stack e-commerce solution with modern UI and seamless payment integration.",
    tags: ["Website", "Full Stack", "ReactJS", "Next.js"],
    imageUrl: "/images/projects/ecommerce.jpg",
    demoUrl: "https://ecommerce-demo.example.com",
    githubUrl: "https://github.com/username/ecommerce-platform",
    featured: true,
    completedAt: "2023-08-15",
  },
  {
    id: "project-2",
    title: "Finance Dashboard",
    description: "Interactive dashboard for financial data visualization. Built with ReactJS, TypeScript, and D3.js. Features include real-time data updates, customizable charts, and responsive design.",
    summary: "Interactive financial dashboard with advanced data visualization capabilities.",
    tags: ["Website", "ReactJS"],
    imageUrl: "/images/projects/finance-dashboard.jpg",
    demoUrl: "https://finance-dashboard.example.com",
    githubUrl: "https://github.com/username/finance-dashboard",
    featured: true,
    completedAt: "2023-06-20",
  },
  {
    id: "project-3",
    title: "Social Media App",
    description: "A social media platform with real-time chat, post sharing, and user profiles. Built with Next.js, TypeScript, and Firebase. Features include real-time notifications, image uploads, and user authentication.",
    summary: "Real-time social networking application with modern features and responsive design.",
    tags: ["Website", "Full Stack", "ReactJS", "Next.js"],
    imageUrl: "/images/projects/social-app.jpg",
    demoUrl: "https://social-app.example.com",
    githubUrl: "https://github.com/username/social-app",
    featured: false,
    completedAt: "2023-04-10",
  },
  {
    id: "project-4",
    title: "Task Management System",
    description: "A comprehensive task management system with Kanban board, task assignments, and progress tracking. Built with ReactJS, TypeScript, and Node.js. Features include drag-and-drop interface, task filtering, and team collaboration tools.",
    summary: "Efficient task management system with intuitive UI and collaboration features.",
    tags: ["Website", "Full Stack", "ReactJS"],
    imageUrl: "/images/projects/task-manager.jpg",
    demoUrl: "https://task-manager.example.com",
    githubUrl: "https://github.com/username/task-manager",
    featured: false,
    completedAt: "2023-02-28",
  },
  {
    id: "project-5",
    title: "React Native Fitness App",
    description: "A fitness tracking application for react native devices. Built with ReactJS Native and TypeScript. Features include workout tracking, progress visualization, and personalized fitness plans.",
    summary: "Comprehensive fitness solution for tracking workouts and monitoring progress.",
    tags: ["React Native", "ReactJS"],
    imageUrl: "/images/projects/fitness-app.jpg",
    demoUrl: "https://fitness-app.example.com",
    githubUrl: "https://github.com/username/fitness-app",
    featured: true,
    completedAt: "2022-12-15",
  },
  {
    id: "project-6",
    title: "UI Component Library",
    description: "A custom UI component library built with ReactJS, TypeScript, and Storybook. Includes form elements, navigation components, cards, and more with comprehensive documentation.",
    summary: "Reusable UI component system with detailed documentation and examples.",
    tags: ["Website", "UI/UX", "ReactJS"],
    imageUrl: "/images/projects/ui-library.jpg",
    demoUrl: "https://ui-library.example.com",
    githubUrl: "https://github.com/username/ui-library",
    featured: false,
    completedAt: "2022-10-05",
  },
];
