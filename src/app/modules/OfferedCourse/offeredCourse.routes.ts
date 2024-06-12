import express from "express";
import { RequestValidation } from "../../middleware/validateRequest";
import { OfferedCourseValidation } from "./offeredCourse.validation";
import { OfferedCourseController } from "./offeredCourse.controller";

const router = express.Router();

router.post(
  "/create-offered-course",
  RequestValidation(
    OfferedCourseValidation.createOfferedCourseValidationSchema,
  ),
  OfferedCourseController.createOfferedCourse,
);

router.get("/", OfferedCourseController.getAllOfferedCourse);

router.get("/:id", OfferedCourseController.getSingleOfferedCourse);

router.patch(
  "/:id",
  RequestValidation(
    OfferedCourseValidation.updateOfferedCourseValidationSchema,
  ),
  OfferedCourseController.updateSingleOfferedCourse,
);

router.delete("/:id", OfferedCourseController.deleteSingleOfferedCourse);

export const OfferedCourseRoutes = router;
