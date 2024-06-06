import express from "express";
import { AdminController } from "./admin.controller";
import { RequestValidation } from "../../middleware/validateRequest";
import { AdminValidation } from "./admin.validation";

const router = express.Router();

router.get("/", AdminController.getAllAdmin);

router.get("/:id", AdminController.getSingleAdmin);

router.patch(
  "/:id",
  RequestValidation(AdminValidation.updateAdminSchemaValidation),
  AdminController.updateSingleAdmin,
);

router.delete("/:id", AdminController.deleteSingleAdmin);

export const AdminRoutes = router;
