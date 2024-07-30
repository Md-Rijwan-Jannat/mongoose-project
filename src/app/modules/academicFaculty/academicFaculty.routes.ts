import express from "express";
import { AcademicFacultyControllers } from "./academicFaculty.controller";
import { RequestValidation } from "../../middleware/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { Auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RequestValidation(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get(
  "/",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  RequestValidation(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.getAllAcademicFaculty,
);

router.get(
  "/:facultyId",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  RequestValidation(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.getSingleAcademicFaculty,
);

router.patch(
  "/:facultyId",
  Auth(USER_ROLE.admin),
  RequestValidation(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateSingleAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
