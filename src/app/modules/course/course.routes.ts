import express from "express";
import { CourseControllers } from "./course.controllers";

const router = express.Router();

router.post("/create-course", CourseControllers.createCourse);

router.get("/", CourseControllers.getAllCourse);

router.get("/single-course", CourseControllers.getSingleCourse);

router.put("/update-course", CourseControllers.UpdateSingleCourse);

export const courseRoutes = router;
