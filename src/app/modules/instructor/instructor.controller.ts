/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InstructorServices } from "./instructor.services";
import instructorValidationSchema from "./instructor.validation";
import { catchAsync } from "../../utils/catchAsync";

// Create instructor
const createInstructor = catchAsync(async (req, res, next) => {
  const { instructor: instructorData } = await req.body;
  const { error, value } = instructorValidationSchema.validate(instructorData);
  console.log({ error }, { value });
  if (error) {
    res.status(500).json({
      success: false,
      message: "Instructor validation filed",
      error: error.details,
    });
  } else {
    const result = await InstructorServices.createInstructorIntoDB(value);
    res.status(202).json({
      success: true,
      message: "Instructor is created successfully",
      data: result,
    });
  }
});

// Get all instructor
const getAllInstructor = catchAsync(async (req, res, next) => {
  const result = await InstructorServices.getAllInstructorFromDB();
  res.status(202).json({
    success: true,
    message: "Instructors are retrieved successfully",
    data: result,
  });
});

// Get single instructor
const getSingleInstructor = catchAsync(async (req, res, next) => {
  const { _id } = req.query;
  const result = await InstructorServices.getSingleInstructorFromDB(
    _id as string,
  );
  res.status(202).json({
    success: true,
    message: "Instructor is retrieved successfully",
    data: result,
  });
});

export const InstructorControllers = {
  createInstructor,
  getAllInstructor,
  getSingleInstructor,
};
