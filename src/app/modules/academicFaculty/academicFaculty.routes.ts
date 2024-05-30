import { Router } from "express";
import { AcademicFacultyControllers } from "./academicFaculty.controller";
import { Validation } from "../../middleware/dataValidation";
import { AcademicFacultyValidation } from "./academicFaculty.validation";

const router = Router();

router.post(
  "/create-academic-faculty",
  Validation(AcademicFacultyValidation.createAcademicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get(
  "/",
  Validation(AcademicFacultyValidation.updateAcademicFacultyValidationSchema),
  AcademicFacultyControllers.getAllAcademicFaculty,
);

router.get(
  "/:facultyId",
  Validation(AcademicFacultyValidation.updateAcademicFacultyValidationSchema),
  AcademicFacultyControllers.getSingleAcademicFaculty,
);

router.patch(
  "/:facultyId",
  Validation(AcademicFacultyValidation.updateAcademicFacultyValidationSchema),
  AcademicFacultyControllers.updateSingleAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
