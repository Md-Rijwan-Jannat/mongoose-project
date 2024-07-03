import express from "express";
import { AdminController } from "./admin.controller";
import { RequestValidation } from "../../middleware/validateRequest";
import { AdminValidation } from "./admin.validation";
import { Auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.get("/", Auth(USER_ROLE.admin), AdminController.getAllAdmin);

router.get("/:id", Auth(USER_ROLE.admin), AdminController.getSingleAdmin);

router.patch(
  "/:id",
  Auth(USER_ROLE.admin),
  RequestValidation(AdminValidation.updateAdminSchemaValidation),
  AdminController.updateSingleAdmin,
);

router.delete("/:id", Auth(USER_ROLE.admin), AdminController.deleteSingleAdmin);

export const AdminRoutes = router;
