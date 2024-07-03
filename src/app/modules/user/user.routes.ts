import express from "express";
import { StudentValidations } from "../student/student.validation";
import { RequestValidation } from "../../middleware/validateRequest";
import { UserControllers } from "./user.controller";
import { FacultyValidation } from "../Faculty/faculty.validation";
import { AdminValidation } from "../Admin/admin.validation";
import { Auth } from "../../middleware/auth";
import { USER_ROLE } from "./user.constants";

const router = express.Router();

router.post(
  "/create-student",
  Auth(USER_ROLE.admin),
  RequestValidation(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  "/create-faculty",
  Auth(USER_ROLE.admin),
  RequestValidation(FacultyValidation.createFacultySchemaValidation),
  UserControllers.createFaculty,
);

router.post(
  "/create-admin",
  Auth(USER_ROLE.admin),
  RequestValidation(AdminValidation.createAdminSchemaValidation),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
