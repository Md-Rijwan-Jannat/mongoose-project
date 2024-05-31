import { Student } from "./student.model";

// Get All student
const getAllStudentFromDB = async () => {
  const result = await Student.find().populate("admissionSemester").populate({
    path: "academicDepartment",
    populate: "academicFaculty",
  });
  return result;
};

// Get single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

// delete student
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.findOneAndUpdate(
    { id },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
