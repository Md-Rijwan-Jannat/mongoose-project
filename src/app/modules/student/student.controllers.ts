import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.services';
import studentSValidationSchema from './student.validation';

// Create student
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = await req.body;
    const { error, value } = studentSValidationSchema.validate(studentData);
    console.log({ error }, { value });

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Student validation failed',
        error: error.details,
      });
    } else {
      const result = await StudentServices.createStudentIntoDB(value);
      res.status(202).json({
        success: true,
        message: 'Student is created successfully',
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Student are not created',
      error,
    });
    console.log(error);
  }
};

// Get all student
const grtAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(202).json({
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Get single student
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.query;
    const result = await StudentServices.getSingleStudentFromDB(_id as string);

    res.status(202).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentControllers = {
  createStudent,
  grtAllStudents,
  getSingleStudent,
};
