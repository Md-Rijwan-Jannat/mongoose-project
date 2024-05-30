import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { StudentRoutes } from "../modules/student/student.routes";
import { courseRoutes as CourseRoutes } from "../modules/course/course.routes";
import { InstructorRoutes } from "../modules/instructor/instructor.routes";
import { SemesterRoutes } from "../modules/semester/semester.routes";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";

const router = Router();

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
    path: "/semesters",
    routeFile: SemesterRoutes,
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
    path: "/course",
    routeFile: CourseRoutes,
  },
  {
    path: "/instructors",
    routeFile: InstructorRoutes,
  },
];

// all route loop is here
routeModel.forEach((route) => router.use(route.path, route.routeFile));

export default router;
