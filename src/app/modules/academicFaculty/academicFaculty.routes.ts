import { Router } from "express";
import { AcademicFacultyControllers } from "./academicFaculty.controller";
import { RequestValidation } from "../../middleware/dataValidation";
import { AcademicFacultyValidation } from "./academicFaculty.validation";

const router = Router();

router.post(
  "/create-academic-faculty",
  RequestValidation(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get(
  "/",
  RequestValidation(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.getAllAcademicFaculty,
);

router.get(
  "/:facultyId",
  RequestValidation(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.getSingleAcademicFaculty,
);

router.patch(
  "/:facultyId",
  RequestValidation(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateSingleAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
