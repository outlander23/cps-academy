import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  listCourses,
  getCourseDetail,
} from "../controllers/courseController.js";

const router = Router();

router.get("/", authenticate, listCourses);
router.get("/:courseId", authenticate, getCourseDetail);

export default router;
