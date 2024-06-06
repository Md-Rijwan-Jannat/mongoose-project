import express from "express";

import { UserRoutes } from "../modules/user/user.routes";
import { SemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";
import { StudentRoutes } from "../modules/student/student.routes";
import { FacultyRoutes } from "../modules/Faculty/faculty.routes";
import { AdminRoutes } from "../modules/Admin/admin.routes";
const router = express.Router();

const routeModel = [
  {
    path: "/users",
    routeFile: UserRoutes,
  },
  {
    path: "/students",
    routeFile: StudentRoutes,
  },
  {
    path: "/faculties",
    routeFile: FacultyRoutes,
  },
  {
    path: "/admins",
    routeFile: AdminRoutes,
  },
  {
    path: "/academic-faculties",
    routeFile: AcademicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    routeFile: AcademicDepartmentRoutes,
  },
  {
    path: "/semesters",
    routeFile: SemesterRoutes,
  },
];

// Check each route file and ensure it's not undefined
routeModel.forEach((route) => {
  router.use(route.path, route.routeFile);
});

export default router;
