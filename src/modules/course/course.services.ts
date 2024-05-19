import { TCourse } from './course.interface';
import { CourseModel } from './course.model';

const CreateCourseIntoDB = async (course: TCourse) => {
  const result = await CourseModel.create(course);
  return result;
};

const GetAllCourseFromDB = async () => {
  const result = await CourseModel.find();
  return result;
};

const GetSingleCourseFromDB = async (_id: string) => {
  const result = await CourseModel.findOne({ _id });
  return result;
};

export const CourseServices = {
  CreateCourseIntoDB,
  GetAllCourseFromDB,
  GetSingleCourseFromDB,
};
