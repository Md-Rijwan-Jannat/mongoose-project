import httpStatus from "http-status";
import { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";
import { AppError } from "../../middleware/errorHandler";

// Create academic department service
const createAcademicDepartmentIntoDB = async (payload: IAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Failed to cerate academic department!",
    );
  }

  return result;
};

// Get all departments service
const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find().populate("academicFaculty");

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Failed to retrieved academic departments!",
    );
  }
  return result;
};

// Get single academic department service
const getSingleAcademicDepartmentFromDB = async (_id: string) => {
  const result = await AcademicDepartment.findOne({ _id }).populate(
    "academicFaculty",
  );
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Failed to retrieved academic department!",
    );
  }
  return result;
};

// Update single academic department
const updateSingleAcademicDepartmentFromDB = async (
  _id: string,
  payload: IAcademicDepartment,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate({ _id }, payload, {
    new: true,
  });
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Failed to update academic department!",
    );
  }
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateSingleAcademicDepartmentFromDB,
};
