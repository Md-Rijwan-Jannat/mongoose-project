import { TInstructor } from './instructor.interface';
import { InstructorModel } from './instructor.model';

// Create instructor
const createInstructorIntoDB = async (instructor: TInstructor) => {
  const result = await InstructorModel.create(instructor);
  return result;
};

// Get all instructor
const getAllInstructorFromDB = async () => {
  const result = await InstructorModel.find();
  return result;
};

// Get single instructor
const getSingleInstructorFromDB = async (_id: string) => {
  const result = await InstructorModel.findOne({ _id });
  return result;
};

export const InstructorServices = {
  createInstructorIntoDB,
  getAllInstructorFromDB,
  getSingleInstructorFromDB,
};
