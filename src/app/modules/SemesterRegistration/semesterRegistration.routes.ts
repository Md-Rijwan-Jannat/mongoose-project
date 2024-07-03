import express from "express";
import { SemesterRegistrationController } from "./semesterRegistration.controller";
import { RequestValidation } from "../../middleware/validateRequest";
import { SemesterRegistrationValidation } from "./semesterRegistration.validation";
import { Auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.post(
  "/create-semester-registration",
  Auth(USER_ROLE.admin, USER_ROLE.faculty),
  RequestValidation(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get(
  "/",
  Auth(USER_ROLE.admin, USER_ROLE.faculty),
  SemesterRegistrationController.getAllSemesterRegistration,
);

router.get(
  "/:id",
  Auth(USER_ROLE.admin, USER_ROLE.faculty),
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  "/:id",
  Auth(USER_ROLE.admin, USER_ROLE.faculty),
  RequestValidation(
    SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSingleSemesterRegistration,
);

router.delete(
  "/:id",
  Auth(USER_ROLE.admin),
  SemesterRegistrationController.deleteSingleSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
