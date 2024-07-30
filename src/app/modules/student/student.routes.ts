import express from "express";
import { StudentControllers } from "./student.controller";
import { updateStudentValidationSchema } from "./student.validation";
import { RequestValidation } from "../../middleware/validateRequest";
import { Auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.get(
  "/",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.getAllStudents,
);

router.get(
  "/:id",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.getSingleStudent,
);

router.patch(
  "/:id",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RequestValidation(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete(
  "/:id",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentControllers.deleteStudent,
);

export const StudentRoutes = router;
