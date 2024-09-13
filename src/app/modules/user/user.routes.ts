import express, { NextFunction, Request, Response } from "express";
import { StudentValidations } from "../student/student.validation";
import { RequestValidation } from "../../middleware/validateRequest";
import { UserControllers } from "./user.controller";
import { FacultyValidation } from "../Faculty/faculty.validation";
import { AdminValidation } from "../Admin/admin.validation";
import { Auth } from "../../middleware/auth";
import { USER_ROLE } from "./user.constants";
import { UserValidation } from "./user.validation";
import httpStatus from "http-status";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.post(
  "/create-student",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }
      next();
    } catch (error) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Invalid JSON data" });
    }
  },
  RequestValidation(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  "/create-faculty",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }
      next();
    } catch (error) {
      return res.status(400).json({ message: "Invalid JSON data" });
    }
  },
  RequestValidation(FacultyValidation.createFacultySchemaValidation),
  UserControllers.createFaculty,
);

router.post(
  "/create-admin",
  Auth(USER_ROLE.superAdmin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }
      next();
    } catch (error) {
      return res.status(400).json({ message: "Invalid JSON data" });
    }
  },
  RequestValidation(AdminValidation.createAdminSchemaValidation),
  UserControllers.createAdmin,
);

router.get(
  "/me",
  Auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  UserControllers.getMe,
);

router.patch(
  "/user-status-change/:id",
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RequestValidation(UserValidation.userStatusChangeValidationSchema),
  UserControllers.userStatusChange,
);

export const UserRoutes = router;
