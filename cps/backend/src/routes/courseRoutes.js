import { Router } from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import {
  createCourse,
  deleteCourse,
  listCourses,
  getCourseDetail,
  updateCourse,
} from "../controllers/courseController.js";
import { USER_ROLES } from "../models/user.model.js";

const router = Router();

router.get("/", authenticate, listCourses);
router.get("/:courseId", authenticate, getCourseDetail);
router.post("/", authenticate, authorize(USER_ROLES.DEVELOPER), createCourse);
router.patch(
  "/:courseId",
  authenticate,
  authorize(USER_ROLES.DEVELOPER),
  updateCourse
);
router.delete(
  "/:courseId",
  authenticate,
  authorize(USER_ROLES.DEVELOPER),
  deleteCourse
);

export default router;
