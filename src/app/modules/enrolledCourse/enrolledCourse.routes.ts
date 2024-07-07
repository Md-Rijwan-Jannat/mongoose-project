import express from "express";
import { EnrolledCourseValidation } from "./enrolledCourse.validation";
import { EnrolledCourseController } from "./enrolledCourse.controller";
import { RequestValidation } from "../../middleware/validateRequest";
import { Auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.post(
  "/create-enrolled-course",
  Auth(USER_ROLE.student),
  RequestValidation(EnrolledCourseValidation.createEnrolledCourseSchema),
  EnrolledCourseController.createEnrolledCourse,
);

router.patch(
  "/update-enrolled-course-mark",
  Auth(USER_ROLE.faculty),
  RequestValidation(EnrolledCourseValidation.updateEnrolledCourseMarkSchema),
  EnrolledCourseController.updateEnrolledCourseMark,
);

export const EnrolledCourseRoutes = router;
