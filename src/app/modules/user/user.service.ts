import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { Student } from "../student/student.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";
import { User } from "./user.model";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { IUser } from "./user.interface";
import { TStudent } from "../student/student.interface";
import AppError from "../../error/AppError";
import { IFaculty } from "../Faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../Faculty/faculty.model";
import { IAdmin } from "../Admin/admin.interface";
import { Admin } from "../Admin/admin.model";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "student";
  userData.email = payload.email;

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(400, "Admission semester not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a student (transaction-2)

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFacultyIntoDB = async (password: string, payload: IFaculty) => {
  const userData: Partial<IUser> = {};

  userData.password = password || (config.default_password as string);

  userData.role = "faculty";
  userData.email = payload.email;

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateFacultyId();

    const newUser = await User.create([userData], { session });

    if (!newUser) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Faculty user creation failed!",
      );
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faculty creation failed!");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty[0];
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Faculty can't create! Error: ${error.message}`,
    );
  }
};

const createAdminIntoDB = async (password: string, payload: IAdmin) => {
  const userData: Partial<IUser> = {};
  userData.password = password || (config.default_password as string);

  userData.role = "admin";
  userData.email = payload.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateAdminId();
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
