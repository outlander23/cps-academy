import { connectDB } from "./connect.db.js";
import { User, USER_ROLES } from "../models/user.model.js";
import { Course } from "../models/course.model.js";

const roles = USER_ROLES;

const seedUsers = [
  {
    email: "welcome@cpsacademy.com",
    name: "Welcome User",
    role: roles.NORMAL,
    passwordHash: "password123",
  },
  {
    email: "student@cpsacademy.com",
    name: "Sandra Student",
    role: roles.STUDENT,
    passwordHash: "password123",
  },
  {
    email: "smm@cpsacademy.com",
    name: "Sam Social",
    role: roles.SOCIAL_MANAGER,
    passwordHash: "password123",
  },
  {
    email: "dev@cpsacademy.com",
    name: "Devon Developer",
    role: roles.DEVELOPER,
    passwordHash: "password123",
  },
];

const seedCourses = [
  {
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
        title: "Human-Centered Design",
        topics: [
          "Personas & Empathy Maps",
          "Problem Statements",
          "Value Propositions",
        ],
        classes: [
          {
            title: "Design Principles 101",
            duration: 35,
            recordingUrl: "https://www.youtube.com/watch?v=3Yyllfd_ojc",
          },
        ],
      },
      {
        title: "Rapid Prototyping",
        topics: ["Storyboarding", "Low-fi Prototypes", "Usability Testing"],
        classes: [
          {
            title: "Prototyping Crash Course",
            duration: 42,
            recordingUrl: "https://www.youtube.com/watch?v=Qz0KTgyj9K0",
          },
        ],
      },
    ],
  },
  {
    title: "Modern Web Platform",
    description:
      "Ship production-grade apps with React, Node.js, and cloud tooling.",
    audience: [roles.STUDENT, roles.DEVELOPER],
    modules: [
      {
        title: "Advanced React Patterns",
        topics: ["Hooks Deep Dive", "Suspense", "Error Boundaries"],
        classes: [
          {
            title: "Performance Profiling",
            duration: 48,
            recordingUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM",
          },
        ],
      },
      {
        title: "Node.js Production Essentials",
        topics: ["RESTful APIs", "Security Hardening", "Observability"],
        classes: [
          {
            title: "Node Deployment on Railway",
            duration: 39,
            recordingUrl: "https://www.youtube.com/watch?v=RGKi6LSPDLU",
          },
        ],
      },
    ],
  },
  {
    title: "Brand Storytelling for Social Media",
    description:
      "Craft shareable narratives that grow communities across platforms.",
    audience: [roles.SOCIAL_MANAGER, roles.NORMAL],
    modules: [
      {
        title: "Narrative Frameworks",
        topics: ["Hero Journey", "Story Arcs", "Content Pillars"],
        classes: [
          {
            title: "Magnetic Social Hooks",
            duration: 27,
            recordingUrl: "https://www.youtube.com/watch?v=JfIqv5a8XDA",
          },
        ],
      },
      {
        title: "Analytics & Iteration",
        topics: ["A/B Testing", "Listening Tools", "Reporting Dashboards"],
        classes: [
          {
            title: "Measuring Story Impact",
            duration: 31,
            recordingUrl: "https://www.youtube.com/watch?v=2JYT5f2isg4",
          },
        ],
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    console.log("Cleared existing data");

    // Insert users
    const users = await User.insertMany(seedUsers);
    console.log(`✓ Seeded ${users.length} users`);

    // Insert courses
    const courses = await Course.create(seedCourses);
    console.log(`✓ Seeded ${courses.length} courses`);

    console.log("\n✨ Database seeded successfully!");
    console.log("\nDemo credentials:");
    seedUsers.forEach((u) => {
      console.log(`  ${u.role.padEnd(15)} → ${u.email} / password123`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
