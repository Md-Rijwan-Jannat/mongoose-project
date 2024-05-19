import { TStudent } from './student.interface';
import { TStudentModel } from './student.model';

// Create student
const createStudentIntoDB = async (student: TStudent) => {
  const result = await TStudentModel.create(student);
  return result;
};

// Get All student
const getAllStudentFromDB = async () => {
  const result = await TStudentModel.find();
  return result;
};

// Get single student
const getSingleStudentFromDB = async (_id: string) => {
  const result = await TStudentModel.findOne({ _id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
