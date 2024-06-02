import express from "express";
import { StudentControllers } from "./student.controllers";
import { RequestValidation } from "../../middleware/dataValidation";
import { studentValidations } from "./student.validation";

const router = express.Router();

router.get("/", StudentControllers.grtAllStudents);

router.get("/:studentId", StudentControllers.getSingleStudent);

router.patch(
  "/:studentId",
  RequestValidation(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateSingleStudent,
);

router.delete("/:studentId", StudentControllers.deleteStudent);

export const StudentRoutes = router;
