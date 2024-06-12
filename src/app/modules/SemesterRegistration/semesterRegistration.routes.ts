import express from "express";
import { SemesterRegistrationController } from "./semesterRegistration.controller";
import { RequestValidation } from "../../middleware/validateRequest";
import { SemesterRegistrationValidation } from "./semesterRegistration.validation";

const router = express.Router();

router.post(
  "/create-semester-registration",
  RequestValidation(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get("/", SemesterRegistrationController.getAllSemesterRegistration);

router.get(
  "/:id",
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  "/:id",
  RequestValidation(
    SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSingleSemesterRegistration,
);

router.delete(
  "/:id",
  SemesterRegistrationController.deleteSingleSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
