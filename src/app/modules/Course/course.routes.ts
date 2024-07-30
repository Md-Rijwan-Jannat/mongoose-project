import express from "express";
import { CourseController } from "./course.controller";
import { RequestValidation } from "../../middleware/validateRequest";
import { CourseValidation } from "./course.validation";
import { Auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.post(
  "/create-course",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RequestValidation(CourseValidation.courseCourseValidationSchema),
  CourseController.createCourse,
);

router.get(
  "/",
  Auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseController.getAllCourses,
);

router.get(
  "/:id",
  Auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseController.getSingleCourse,
);

router.patch(
  "/:id",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RequestValidation(CourseValidation.updateCourseValidationSchema),
  CourseController.updateSingleCourse,
);

router.put(
  "/:courseId/assign-faculties",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RequestValidation(CourseValidation.FacultyWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse,
);

router.get(
  "/:courseId/get-assign-faculties",
  Auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseController.getAssignFacultiesWithCourse,
);

router.delete(
  "/:courseId/remove-faculties",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RequestValidation(CourseValidation.FacultyWithCourseValidationSchema),
  CourseController.removeFacultiesWithCourse,
);

router.delete("/:id", CourseController.deleteSingleCourse);

export const CourseRoutes = router;
