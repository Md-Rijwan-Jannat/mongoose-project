import { Router } from "express";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
import { RequestValidation } from "../../middleware/dataValidation";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";

const router = Router();

router.post(
  "/create-academic-department",
  // RequestValidation(
  //   AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  // ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get(
  "/",
  RequestValidation(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.getAllAcademicDepartment,
);

router.get(
  "/:departmentId",
  RequestValidation(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  "/:departmentId",
  RequestValidation(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
