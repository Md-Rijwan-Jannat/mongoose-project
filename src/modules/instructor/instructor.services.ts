import { Instructor } from './instructor.interface';
import { InstructorModel } from './instructor.model';

const createInstructorIntoDB = async (instructor: Instructor) => {
  const result = await InstructorModel.create(instructor);
  return result;
};

export const InstructorServices = {
  createInstructorIntoDB,
};
