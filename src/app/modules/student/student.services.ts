import { IStudent } from './student.interface';
import { Student } from './student.model';

// Create student
const createStudentIntoDB = async (studentData: IStudent) => {
  // const result = await Student.create(studentData); //Build-in static methods\

  // Build in instance methods
  const student = new Student(studentData); // create an instance

  if (await student.isUserExists(studentData.id)) {
    throw new Error('Student is already exists');
  } else {
    const result = student.save(); //build in instance methods
    return result;
  }
};

// Get All student
const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

// Get single student
const getSingleStudentFromDB = async (_id: string) => {
  const result = await Student.findOne({ _id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
