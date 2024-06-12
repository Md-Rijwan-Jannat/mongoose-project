import express from "express";
import { StudentControllers } from "./student.controller";
import { updateStudentValidationSchema } from "./student.validation";
import { RequestValidation } from "../../middleware/validateRequest";
import { Auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.get("/", Auth(USER_ROLE.student), StudentControllers.getAllStudents);

router.get("/:id", StudentControllers.getSingleStudent);

router.patch(
  "/:id",
  RequestValidation(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete("/:id", StudentControllers.deleteStudent);

export const StudentRoutes = router;
