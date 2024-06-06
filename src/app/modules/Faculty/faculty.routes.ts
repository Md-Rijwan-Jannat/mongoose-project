import express from "express";
import { FacultyController } from "./faculty.controller";
import { RequestValidation } from "../../middleware/validateRequest";
import { FacultyValidation } from "./faculty.validation";

const router = express.Router();

router.get("/", FacultyController.getAllFaculties);

router.get("/:id", FacultyController.getSingleFaculty);

router.patch(
  "/:id",
  RequestValidation(FacultyValidation.updateFacultySchemaValidation),
  FacultyController.updateSingleFaculty,
);

router.delete("/:id", FacultyController.deleteSingleFaculty);

export const FacultyRoutes = router;
