import { IFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { facultySearchableFields } from "./faculty.constants";

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const filterQueryBuilder = new QueryBuilder(
    Faculty.find()
      .populate("user")
      .populate("academicDepartment")
      .populate("academicFaculty"),
    query,
  )
    .search(facultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await filterQueryBuilder.modelQuery;
  const meta = await filterQueryBuilder.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id)
    .populate("user")
    .populate("academicDepartment")
    .populate("academicFaculty");
  return result;
};

const updateSingleFacultyIntoDB = async (
  id: string,
  payload: Partial<IFaculty>,
) => {
  const { name, ...remainingData } = payload;

  const modifiedFacultyData: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedFacultyData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedFacultyData, {
    new: true,
  })
    .populate("user")
    .populate("academicDepartment")
    .populate("academicFaculty");
  return result;
};

const deleteSingleFacultyIntoDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.NOT_FOUND, "Faculty deletion failed!");
    }

    const deletedUser = await User.findByIdAndUpdate(
      deletedFaculty.user,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.NOT_FOUND, "User deletion failed!");
    }

    await session.commitTransaction();
    return deletedFaculty;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "User deletion failed!",
    );
  } finally {
    session.endSession();
  }
};

export const FacultyService = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateSingleFacultyIntoDB,
  deleteSingleFacultyIntoDB,
};
