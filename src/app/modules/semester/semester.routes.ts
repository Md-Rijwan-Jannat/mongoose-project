import { Router } from "express";
import { SemesterController } from "./semester.controller";
import { RequestValidation } from "../../middleware/dataValidation";
import { SemesterValidation } from "./semester.validation";

const router = Router();

router.post(
  "/create-semester",
  RequestValidation(SemesterValidation.createSemesterValidationSchema),
  SemesterController.createSemester,
);

router.get("/", SemesterController.getAllSemester);

router.get("/:semesterId", SemesterController.getSingleSemester);

router.patch(
  "/:semesterId",
  RequestValidation(SemesterValidation.updateSemesterValidationSchema),
  SemesterController.updateSingleSemester,
);

export const SemesterRoutes = router;
