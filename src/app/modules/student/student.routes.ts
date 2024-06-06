import express from "express";
import { StudentControllers } from "./student.controller";
import { updateStudentValidationSchema } from "./student.validation";
import { RequestValidation } from "../../middleware/validateRequest";

const router = express.Router();

router.get("/", StudentControllers.getAllStudents);

router.get("/:id", StudentControllers.getSingleStudent);

router.patch(
  "/:id",
  RequestValidation(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete("/:id", StudentControllers.deleteStudent);

export const StudentRoutes = router;
