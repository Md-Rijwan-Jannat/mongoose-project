import { NextFunction, Request, Response } from 'express';
import { InstructorServices } from './instructor.services';

const createInstructor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const student = await req.body;
    const result = await InstructorServices.createInstructorIntoDB(student);

    res.status(200).json({
      success: true,
      message: 'Instructor is created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const InstructorControllers = {
  createInstructor,
};
