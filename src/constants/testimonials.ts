/**
 * Testimonials data structure for the Testimonials section
 * Contains testimonials from clients and colleagues
 */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating?: number; // Optional 1-5 star rating
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Alex Johnson",
    role: "CTO",
    company: "TechVision",
    avatar: "/images/testimonials/avatar-1.jpg",
    content: "Working with this developer was an absolute pleasure. They delivered a stunning website that exceeded our expectations, with attention to detail and performance optimization that truly sets them apart.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Sophia Chen",
    role: "Product Manager",
    company: "InnovateCorp",
    avatar: "/images/testimonials/avatar-2.jpg",
    content: "I was impressed by the level of creativity and technical skill. They transformed our concept into a beautiful, functional website with animations that enhance the user experience without sacrificing performance.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Marcus Williams",
    role: "Founder",
    company: "CreativeStudio",
    avatar: "/images/testimonials/avatar-3.jpg",
    content: "The attention to detail and commitment to quality was exceptional. Our website not only looks amazing but also performs flawlessly across all devices. I highly recommend their services.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Emma Davis",
    role: "Marketing Director",
    company: "BrandForward",
    avatar: "/images/testimonials/avatar-4.jpg",
    content: "Our website redesign project was completed on time and with exceptional quality. The animations and interactions added a level of polish that has significantly increased user engagement with our content.",
    rating: 5,
  },
  {
    id: "t5",
    name: "Ryan Thompson",
    role: "UX Designer",
    company: "DesignHub",
    avatar: "/images/testimonials/avatar-5.jpg",
    content: "As a designer myself, I have high standards for implementation. This developer exceeded those standards, bringing my designs to life with perfect attention to detail and adding thoughtful animations that enhanced the experience.",
    rating: 5,
  },
];
