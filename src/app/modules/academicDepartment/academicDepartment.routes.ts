import { Router } from "express";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
import { Validation } from "../../middleware/dataValidation";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";

const router = Router();

router.post(
  "/create-academic-department",
  Validation(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get(
  "/",
  Validation(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.getAllAcademicDepartment,
);

router.get(
  "/:departmentId",
  Validation(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  "/:departmentId",
  Validation(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
