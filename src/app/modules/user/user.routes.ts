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
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RequestValidation(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  "/create-faculty",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RequestValidation(FacultyValidation.createFacultySchemaValidation),
  UserControllers.createFaculty,
);

router.post(
  "/create-admin",
  Auth(USER_ROLE.superAdmin),
  RequestValidation(AdminValidation.createAdminSchemaValidation),
  UserControllers.createAdmin,
);

router.get(
  "/me",
  Auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  UserControllers.getMe,
);

export const UserRoutes = router;
