import { Request, Response } from 'express';
import { CourseServices } from './course.services';
import CourseSchema from './course.validation';

const createCourse = async (req: Request, res: Response) => {
  try {
    const { course: courseData } = await req.body;

    // data validate using zod
    const zodParseCourseData = CourseSchema.parse(courseData);

    const result = await CourseServices.CreateCourseIntoDB(zodParseCourseData);
    res.status(200).json({
      success: true,
      message: 'Course is created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Course validation filed',
      error: error,
    });
  }
};

const getAllCourse = async (req: Request, res: Response) => {
  try {
    const result = await CourseServices.GetAllCourseFromDB();
    res.status(200).json({
      success: true,
      message: 'Course are retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Courses are not founded',
    });
  }
};

const getSingleCourse = async (req: Request, res: Response) => {
  try {
    const { _id } = req.query;
    const result = await CourseServices.GetSingleCourseFromDB(_id as string);
    res.status(200).json({
      success: true,
      message: 'Course is  retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Course is not founded',
    });
  }
};

export const CourseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
};
