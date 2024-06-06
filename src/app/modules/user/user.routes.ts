import express from "express";
import { StudentValidations } from "../student/student.validation";
import { RequestValidation } from "../../middleware/validateRequest";
import { UserControllers } from "./user.controller";
import { FacultyValidation } from "../Faculty/faculty.validation";
import { AdminValidation } from "../Admin/admin.validation";

const router = express.Router();

router.post(
  "/create-student",
  RequestValidation(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  "/create-faculty",
  RequestValidation(FacultyValidation.createFacultySchemaValidation),
  UserControllers.createFaculty,
);

router.post(
  "/create-admin",
  RequestValidation(AdminValidation.createAdminSchemaValidation),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
