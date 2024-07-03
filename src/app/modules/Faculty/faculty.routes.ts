import express from "express";
import { FacultyController } from "./faculty.controller";
import { RequestValidation } from "../../middleware/validateRequest";
import { FacultyValidation } from "./faculty.validation";
import { Auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.get(
  "/",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  FacultyController.getAllFaculties,
);

router.get(
  "/:id",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  FacultyController.getSingleFaculty,
);

router.patch(
  "/:id",
  Auth(USER_ROLE.admin),
  RequestValidation(FacultyValidation.updateFacultySchemaValidation),
  FacultyController.updateSingleFaculty,
);

router.delete(
  "/:id",
  Auth(USER_ROLE.admin),
  FacultyController.deleteSingleFaculty,
);

export const FacultyRoutes = router;
