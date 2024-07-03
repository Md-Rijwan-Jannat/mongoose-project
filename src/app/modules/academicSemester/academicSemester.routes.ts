import express from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import { RequestValidation } from "../../middleware/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";
import { Auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.post(
  "/create-academic-semester",
  Auth(USER_ROLE.admin),
  RequestValidation(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

router.get(
  "/",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  AcademicSemesterController.getAllAcademicSemester,
);

router.get(
  "/:semesterId",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  AcademicSemesterController.getSingleAcademicSemester,
);

router.patch(
  "/:semesterId",
  Auth(USER_ROLE.admin),
  RequestValidation(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateSingleAcademicSemester,
);

export const SemesterRoutes = router;
