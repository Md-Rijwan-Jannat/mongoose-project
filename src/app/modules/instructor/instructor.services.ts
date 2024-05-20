import { IInstructor } from './instructor.interface';
import { Instructor } from './instructor.model';

// Create instructor
const createInstructorIntoDB = async (instructorData: IInstructor) => {
  if (await Instructor.isExistingInstructor(instructorData.id)) {
    throw new Error('Instructor already exists');
  } else {
    const result = await Instructor.create(instructorData);
    return result;
  }

  // create custom a instance methods

  //   const student = new Instructor(instructorData);
  //   if (await student.isUserExists(instructorData.id)) {
  //     throw new Error('User already exists');
  //   }
  // const result = student.save();
};

// Get all instructor
const getAllInstructorFromDB = async () => {
  const result = await Instructor.find();
  return result;
};

// Get single instructor
const getSingleInstructorFromDB = async (_id: string) => {
  const result = await Instructor.findOne({ _id });
  return result;
};

export const InstructorServices = {
  createInstructorIntoDB,
  getAllInstructorFromDB,
  getSingleInstructorFromDB,
};
