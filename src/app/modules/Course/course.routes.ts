import express from "express";
import { CourseController } from "./course.controller";
import { RequestValidation } from "../../middleware/validateRequest";
import { CourseValidation } from "./course.validation";

const router = express.Router();

router.post(
  "/create-course",
  RequestValidation(CourseValidation.courseCourseValidationSchema),
  CourseController.createCourse,
);

router.get("/", CourseController.getAllCourses);

router.get("/:id", CourseController.getSingleCourse);

router.patch(
  "/:id",
  RequestValidation(CourseValidation.updateCourseValidationSchema),
  CourseController.updateSingleCourse,
);

router.put(
  "/:courseId/assign-faculties",
  RequestValidation(CourseValidation.FacultyWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse,
);

router.delete(
  "/:courseId/remove-faculties",
  RequestValidation(CourseValidation.FacultyWithCourseValidationSchema),
  CourseController.removeFacultiesWithCourse,
);

router.delete("/:id", CourseController.deleteSingleCourse);

export const CourseRoutes = router;
