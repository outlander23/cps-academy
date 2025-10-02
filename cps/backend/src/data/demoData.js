import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

const hash = (password) => bcrypt.hashSync(password, 10);

export const roles = {
  NORMAL: "normal",
  STUDENT: "student",
  SOCIAL_MANAGER: "social-manager",
  DEVELOPER: "developer",
};

export const users = [
  {
    id: nanoid(),
    email: "welcome@cpsacademy.com",
    name: "Welcome User",
    role: roles.NORMAL,
    passwordHash: hash("password123"),
  },
  {
    id: nanoid(),
    email: "student@cpsacademy.com",
    name: "Sandra Student",
    role: roles.STUDENT,
    passwordHash: hash("password123"),
  },
  {
    id: nanoid(),
    email: "smm@cpsacademy.com",
    name: "Sam Social",
    role: roles.SOCIAL_MANAGER,
    passwordHash: hash("password123"),
  },
  {
    id: nanoid(),
    email: "dev@cpsacademy.com",
    name: "Devon Developer",
    role: roles.DEVELOPER,
    passwordHash: hash("password123"),
  },
];

export const courses = [
  {
    id: "course-ux-fundamentals",
    title: "UX Fundamentals",
    description: "Design delightful experiences with user-centered strategies.",
    audience: [
      roles.NORMAL,
      roles.STUDENT,
      roles.SOCIAL_MANAGER,
      roles.DEVELOPER,
    ],
    modules: [
      {
        id: "module-ux-1",
        title: "Human-Centered Design",
        topics: [
          "Personas & Empathy Maps",
          "Problem Statements",
          "Value Propositions",
        ],
        classes: [
          {
            id: "class-ux-1a",
            title: "Design Principles 101",
            duration: 35,
            recordingUrl: "https://www.youtube.com/watch?v=3Yyllfd_ojc",
          },
        ],
      },
      {
        id: "module-ux-2",
        title: "Rapid Prototyping",
        topics: ["Storyboarding", "Low-fi Prototypes", "Usability Testing"],
        classes: [
          {
            id: "class-ux-2a",
            title: "Prototyping Crash Course",
            duration: 42,
            recordingUrl: "https://www.youtube.com/watch?v=Qz0KTgyj9K0",
          },
        ],
      },
    ],
  },
  {
    id: "course-web-platform",
    title: "Modern Web Platform",
    description:
      "Ship production-grade apps with React, Node.js, and cloud tooling.",
    audience: [roles.STUDENT, roles.DEVELOPER],
    modules: [
      {
        id: "module-web-1",
        title: "Advanced React Patterns",
        topics: ["Hooks Deep Dive", "Suspense", "Error Boundaries"],
        classes: [
          {
            id: "class-web-1a",
            title: "Performance Profiling",
            duration: 48,
            recordingUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM",
          },
        ],
      },
      {
        id: "module-web-2",
        title: "Node.js Production Essentials",
        topics: ["RESTful APIs", "Security Hardening", "Observability"],
        classes: [
          {
            id: "class-web-2a",
            title: "Node Deployment on Railway",
            duration: 39,
            recordingUrl: "https://www.youtube.com/watch?v=RGKi6LSPDLU",
          },
        ],
      },
    ],
  },
  {
    id: "course-brand-storytelling",
    title: "Brand Storytelling for Social Media",
    description:
      "Craft shareable narratives that grow communities across platforms.",
    audience: [roles.SOCIAL_MANAGER, roles.NORMAL],
    modules: [
      {
        id: "module-brand-1",
        title: "Narrative Frameworks",
        topics: ["Hero’s Journey", "Story Arcs", "Content Pillars"],
        classes: [
          {
            id: "class-brand-1a",
            title: "Magnetic Social Hooks",
            duration: 27,
            recordingUrl: "https://www.youtube.com/watch?v=JfIqv5a8XDA",
          },
        ],
      },
      {
        id: "module-brand-2",
        title: "Analytics & Iteration",
        topics: ["A/B Testing", "Listening Tools", "Reporting Dashboards"],
        classes: [
          {
            id: "class-brand-2a",
            title: "Measuring Story Impact",
            duration: 31,
            recordingUrl: "https://www.youtube.com/watch?v=2JYT5f2isg4",
          },
        ],
      },
    ],
  },
];
