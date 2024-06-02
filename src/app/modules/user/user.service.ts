import config from "../../config";
import { Semester } from "../semester/semester.model";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { generatedStudentId } from "./user.utils";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { ThrowError } from "../../error/throwError";
import httpStatus from "http-status";
import mongoose from "mongoose";

const studentCreateIntoDB = async (password: string, payload: IStudent) => {
  const userData: Partial<IUser> = {};

  // if the have'nt password then set the default password
  userData.password = password || (config.default_password as string);

  // student role set
  userData.role = "student";

  const semesterData = await Semester.findById(payload.admissionSemester);

  if (!semesterData) {
    throw new ThrowError(httpStatus.NOT_FOUND, "Semester not found");
  }

  // student id set
  userData.id = await generatedStudentId(semesterData);

  // transaction validation
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // create the user (transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new ThrowError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create the student (transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new ThrowError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new ThrowError(httpStatus.BAD_REQUEST, "Filed to create data");
  }
};

export const UserServices = {
  studentCreateIntoDB,
};
