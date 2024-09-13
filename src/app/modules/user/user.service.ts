/* eslint-disable no-undef */
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
import AppError from "../../error/AppError";
import { IFaculty } from "../Faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../Faculty/faculty.model";
import { IAdmin } from "../Admin/admin.interface";
import { Admin } from "../Admin/admin.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { TStudent } from "../student/student.interface";
import { sendImageTOCloudinary } from "../../utils/sendImageToCloudinary";

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  const userData: Partial<IUser> = {};
  userData.password = password || (config.default_password as string);

  userData.role = "student";
  userData.email = payload.email;

  console.log("userData =>", userData, config.default_password as string);

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(httpStatus.BAD_REQUEST, "Admission semester not found");
  }

  const isAcademicDepartmentExists = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic department not found");
  }

  const isAcademicFacultyExists = await AcademicFaculty.findById(
    isAcademicDepartmentExists.academicFaculty,
  );

  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Faculty not found");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    userData.id = await generateStudentId(admissionSemester);
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    if (file) {
      const imageName = `${userData.id} ${payload.name.firstName}`;
      const path = file?.path;

      // image upload to cloudinary
      const imageHostingData = await sendImageTOCloudinary(imageName, path);
      const { secure_url }: any = imageHostingData;
      payload.profileImage = secure_url;
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.academicFaculty = isAcademicDepartmentExists.academicFaculty;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction();
    await session.endSession();
    return null;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFacultyIntoDB = async (
  file: Express.Multer.File,
  password: string,
  payload: IFaculty,
) => {
  // Validate payload at the start
  if (!payload) {
    throw new AppError(httpStatus.BAD_REQUEST, "Payload is required");
  }

  const userData: Partial<IUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = "faculty";
  userData.email = payload.email;

  if (!payload.academicDepartment) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Academic department is required",
    );
  }

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(httpStatus.BAD_REQUEST, "Academic department not found");
  }

  const isAcademicDepartmentExists = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic department not found");
  }

  const isAcademicFacultyExists = await AcademicFaculty.findById(
    isAcademicDepartmentExists.academicFaculty,
  );

  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Faculty not found");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateFacultyId();
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    if (file) {
      const imageName = `${userData.id} ${payload.name.firstName}`;
      const path = file?.path;

      // image upload to cloudinary
      const imageHostingData = await sendImageTOCloudinary(imageName, path);
      const { secure_url }: any = imageHostingData;
      payload.profileImage = secure_url;
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.academicFaculty = isAcademicDepartmentExists.academicFaculty;

    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (
  file: Express.Multer.File,
  password: string,
  payload: IAdmin,
) => {
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

    if (file) {
      const imageName = `${userData.id} ${payload.name.firstName}`;
      const path = file?.path;

      // image upload to cloudinary
      const imageHostingData = await sendImageTOCloudinary(imageName, path);
      const { secure_url }: any = imageHostingData;
      payload.profileImage = secure_url;
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

const getMe = (userId: string, role: string) => {
  let result = null;

  if (role === "student") {
    result = Student.findOne({ id: userId });
  }

  if (role === "faculty") {
    result = Faculty.findOne({ id: userId });
  }

  if (role === "admin") {
    result = Admin.findOne({ id: userId });
  }

  return result;
};

const userStatusChangeIntoDB = async (
  payload: { status: string },
  id: string,
) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  userStatusChangeIntoDB,
};
