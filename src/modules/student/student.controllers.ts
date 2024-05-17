import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.services';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const student = await req.body;
    const result = await studentServices.createStudentIntoDB(student);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentControllers = {
  createStudent,
};
