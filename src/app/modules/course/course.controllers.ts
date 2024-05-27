import { catchAsync } from "../../utils/catchAsync";
import { CourseServices } from "./course.services";
import CourseSchema from "./course.validation";

const createCourse = catchAsync(async (req, res) => {
  const { course: courseData } = await req.body;

  // data validate using zod
  const zodParseCourseData = CourseSchema.parse(courseData);

  const result = await CourseServices.CreateCourseIntoDB(zodParseCourseData);
  res.status(200).json({
    success: true,
    message: "Course is created successfully",
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.GetAllCourseFromDB();
  res.status(200).json({
    success: true,
    message: "Course are retrieved successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { _id } = req.query;
  const result = await CourseServices.GetSingleCourseFromDB(_id as string);
  res.status(200).json({
    success: true,
    message: "Course is  retrieved successfully",
    data: result,
  });
});

const UpdateSingleCourse = catchAsync(async (req, res) => {
  const { _id } = req.query;
  const result = await CourseServices.updateSingleCourseFromDB(_id as string);
  res.status(200).json({
    success: true,
    message: "Course update successfully",
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  UpdateSingleCourse,
};
