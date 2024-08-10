import httpStatus from "http-status";
import {
  academicSemesterNameCodeMapper,
  SemesterSearchableFields,
} from "./academicSemester.constants";
import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import AppError from "../../error/AppError";
import QueryBuilder from "../../builder/QueryBuilder";

// Semester create service
const createAcademicSemesterIntoDB = async (payload: IAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid semester code!");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

// get all semester service
const getAllAcademicSemesterFromDB = async (query: Record<string, unknown>) => {
  const academicSemesterQueryBuilder = new QueryBuilder(
    AcademicSemester.find(),
    query,
  )
    .search(SemesterSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicSemesterQueryBuilder.modelQuery;
  const meta = await academicSemesterQueryBuilder.countTotal();

  return {
    meta,
    result,
  };
};

// get single semester service
const getSingleAcademicSemesterFromDB = async (_id: string) => {
  const result = await AcademicSemester.findById({ _id });
  return result;
};

// Update single semester details
const updateSingleAcademicSemesterFromDB = async (
  _id: string,
  payload: Partial<IAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid semester code!");
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterFromDB,
};
