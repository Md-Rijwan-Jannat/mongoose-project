import config from "../../config";
import { Semester } from "../semester/semester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { generatedStudentId } from "./user.utils";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const studentCreateIntoDB = async (password: string, student: IStudent) => {
  const userData: Partial<IUser> = {};

  // if the have'nt password then set the default password
  userData.password = password || (config.default_password as string);

  // student role set
  userData.role = "student";

  const semesterData = await Semester.findById(student.admissionSemester);

  if (!semesterData) {
    throw new Error("Semester not found");
  }

  // student id set
  userData.id = await generatedStudentId(semesterData);

  // create the user
  const newUser = await User.create(userData);

  // create the student
  if (Object.keys(newUser).length) {
    student.id = newUser.id;
    student.user = newUser._id;

    const newStudent = await Student.create(student);

    if (newStudent) {
      return newStudent;
    } else {
      throw new Error("User can't create!");
    }
  }
};

export const UserServices = {
  studentCreateIntoDB,
};
