/**
 * Skills data structure for the Skills section
 * Organized by categories with proficiency levels and descriptions
 */

export interface Skill {
  name: string;
  icon: string;
  proficiency: number; // 0-100 scale
  color?: string;
  description?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      {
        name: "React",
        icon: "react",
        proficiency: 90,
        color: "#61DAFB",
        description: "Building complex interactive UIs with React and related ecosystem",
      },
      {
        name: "Next.js",
        icon: "nextjs",
        proficiency: 85,
        color: "#000000",
        description: "Creating performant and SEO-friendly web applications",
      },
      {
        name: "TypeScript",
        icon: "typescript",
        proficiency: 80,
        color: "#3178C6",
        description: "Developing type-safe applications with advanced TypeScript features",
      },
      {
        name: "TailwindCSS",
        icon: "tailwindcss",
        proficiency: 95,
        color: "#06B6D4",
        description: "Crafting responsive and utility-first designs efficiently",
      },
      {
        name: "HTML/CSS",
        icon: "html",
        proficiency: 95,
        color: "#E34F26",
        description: "Building semantic and accessible web foundations",
      },
    ],
  },
  {
    name: "UX/UI Design",
    skills: [
      {
        name: "Figma",
        icon: "figma",
        proficiency: 85,
        color: "#F24E1E",
        description: "Creating interactive prototypes and design systems",
      },
      {
        name: "UI Design",
        icon: "palette",
        proficiency: 80,
        color: "#FF7262",
        description: "Designing intuitive and visually appealing interfaces",
      },
      {
        name: "Animation",
        icon: "animation",
        proficiency: 75,
        color: "#9C27B0",
        description: "Creating engaging motion design and interactions",
      },
    ],
  },
  {
    name: "Backend & Tools",
    skills: [
      {
        name: "Node.js",
        icon: "nodejs",
        proficiency: 75,
        color: "#339933",
        description: "Building server-side applications and RESTful APIs",
      },
      {
        name: "Git",
        icon: "git",
        proficiency: 85,
        color: "#F05032",
        description: "Version control and collaborative development workflows",
      },
      {
        name: "MongoDB",
        icon: "mongodb",
        proficiency: 70,
        color: "#47A248",
        description: "Designing and working with NoSQL database structures",
      },
    ],
  },
];
