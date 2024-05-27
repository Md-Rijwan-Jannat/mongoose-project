import { Router } from "express";
import { UserController } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import { Validation } from "../../middleware/dataValidation";

const router = Router();

router.post(
  "/create-student",
  Validation(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);
// router.post('/create-faculty', UserController.createFaculty);
// router.post('/create-admin', UserController.createAdmin);

export const UserRoutes = router;