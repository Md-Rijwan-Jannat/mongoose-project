import { Student } from './student.interface';
import { StudentModel } from './student.model';

// Create student
const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

// Get All student
const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

// Get single student
const getSingleStudentFromDB = async (_id: string) => {
  const result = await StudentModel.findOne({ _id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
