import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { StudentRoutes } from "../modules/student/student.routes";
import { courseRoutes as CourseRoutes } from "../modules/course/course.routes";
import { InstructorRoutes } from "../modules/instructor/instructor.routes";

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
