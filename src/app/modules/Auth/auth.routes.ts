import express from "express";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import { RequestValidation } from "../../middleware/validateRequest";
import { Auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.post(
  "/login",
  RequestValidation(AuthValidation.authValidationSchema),
  AuthController.authLogin,
);

router.post(
  "/change-password",
  Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  RequestValidation(AuthValidation.passwordValidationSchema),
  AuthController.changePassword,
);

router.post(
  "/refresh-token",
  RequestValidation(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken,
);

export const AuthRoutes = router;
