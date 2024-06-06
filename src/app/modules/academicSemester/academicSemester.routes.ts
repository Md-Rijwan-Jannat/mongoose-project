import express from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import { RequestValidation } from "../../middleware/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  RequestValidation(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

router.get("/", AcademicSemesterController.getAllAcademicSemester);

router.get(
  "/:semesterId",
  AcademicSemesterController.getSingleAcademicSemester,
);

router.patch(
  "/:semesterId",
  RequestValidation(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateSingleAcademicSemester,
);

export const SemesterRoutes = router;
