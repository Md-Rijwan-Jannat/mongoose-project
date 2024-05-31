import httpStatus from "http-status";
import { AppError } from "../../middleware/errorHandler";
import { ICourse } from "./course.interface";
import { Course } from "./course.model";

const CreateCourseIntoDB = async (courseData: ICourse) => {
  if (await Course.isUserExists(courseData.id)) {
    throw new AppError(httpStatus.NOT_FOUND, "User already exists");
  }
  const result = await Course.create(courseData);
  return result;
};

const GetAllCourseFromDB = async () => {
  const result = await Course.find();
  return result;
};

const GetSingleCourseFromDB = async (_id: string) => {
  const result = await Course.findOne({ _id });
  return result;
};

const updateSingleCourseFromDB = async (_id: string) => {
  const result = await Course.findOneAndUpdate(
    { _id },
    { price: 5500, duration: "6 month" },
    { new: true },
  );
  return result;
};

export const CourseServices = {
  CreateCourseIntoDB,
  GetAllCourseFromDB,
  GetSingleCourseFromDB,
  updateSingleCourseFromDB,
};
