import { connectDB } from "./connect.db.js";
import { Course } from "../models/course.model.js";
import fs from "fs";
import path from "path";

const coursesFilePath = path.resolve("./courses_test_data.json");

const seedCourses = async () => {
  try {
    await connectDB();

    await Course.deleteMany({});
    console.log("Cleared existing courses");

    const coursesData = JSON.parse(fs.readFileSync(coursesFilePath, "utf-8"));

    const insertedCourses = await Course.insertMany(coursesData);
    console.log(`✓ Seeded ${insertedCourses.length} courses successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding courses:", error);
    process.exit(1);
  }
};

seedCourses();
