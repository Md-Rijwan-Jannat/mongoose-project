import { NextFunction, Request, Response } from 'express';
import { InstructorServices } from './instructor.services';
import instructorValidationSchema from './instructor.validation';

// Create instructor
const createInstructor = async (req: Request, res: Response) => {
  try {
    const { instructor: instructorData } = await req.body;
    const { error, value } =
      instructorValidationSchema.validate(instructorData);
    console.log({ error }, { value });
    if (error) {
      res.status(500).json({
        success: false,
        message: 'Instructor validation filed',
        error: error.details,
      });
    } else {
      const result = await InstructorServices.createInstructorIntoDB(value);
      res.status(202).json({
        success: true,
        message: 'Instructor is created successfully',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Instructor are not created',
      error,
    });
  }
};

// Get all instructor
const getAllInstructor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await InstructorServices.getAllInstructorFromDB();
    res.status(202).json({
      success: true,
      message: 'Instructors are retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Get single instructor
const getSingleInstructor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.query;
    const result = await InstructorServices.getSingleInstructorFromDB(
      _id as string,
    );
    res.status(202).json({
      success: true,
      message: 'Instructor is retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const InstructorControllers = {
  createInstructor,
  getAllInstructor,
  getSingleInstructor,
};
