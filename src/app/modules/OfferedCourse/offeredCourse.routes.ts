import express from "express";
import { RequestValidation } from "../../middleware/validateRequest";
import { OfferedCourseValidation } from "./offeredCourse.validation";
import { OfferedCourseController } from "./offeredCourse.controller";
import { Auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.post(
  "/create-offered-course",
  Auth(USER_ROLE.admin),
  RequestValidation(
    OfferedCourseValidation.createOfferedCourseValidationSchema,
  ),
  OfferedCourseController.createOfferedCourse,
);

router.get(
  "/",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  OfferedCourseController.getAllOfferedCourse,
);

router.get(
  "/:id",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  OfferedCourseController.getSingleOfferedCourse,
);

router.patch(
  "/:id",
  Auth(USER_ROLE.admin),
  RequestValidation(
    OfferedCourseValidation.updateOfferedCourseValidationSchema,
  ),
  OfferedCourseController.updateSingleOfferedCourse,
);

router.delete(
  "/:id",
  Auth(USER_ROLE.admin),
  OfferedCourseController.deleteSingleOfferedCourse,
);

export const OfferedCourseRoutes = router;
