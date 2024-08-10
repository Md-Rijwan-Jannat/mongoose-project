import QueryBuilder from "../../builder/QueryBuilder";
import { AcademicDepartmentSearchableFields } from "./academicDepartment.constants";
import { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

// Create academic department service
const createAcademicDepartmentIntoDB = async (payload: IAcademicDepartment) => {
  await AcademicDepartment.isDepartmentExists(payload._id);
  const result = await AcademicDepartment.create(payload);

  return result;
};

// Get all departments service
const getAllAcademicDepartmentFromDB = async (
  query: Record<string, unknown>,
) => {
  const academicDepartmentQueryBuilder = new QueryBuilder(
    AcademicDepartment.find().populate("academicFaculty"),
    query,
  )
    .search(AcademicDepartmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicDepartmentQueryBuilder.modelQuery;
  const meta = await academicDepartmentQueryBuilder.countTotal();

  return {
    meta,
    result,
  };
};

// Get single academic department service
const getSingleAcademicDepartmentFromDB = async (_id: string) => {
  const result =
    await AcademicDepartment.findById(_id).populate("academicFaculty");

  return result;
};

// Update single academic department
const updateSingleAcademicDepartmentFromDB = async (
  _id: string,
  payload: IAcademicDepartment,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(_id, payload, {
    new: true,
  });

  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateSingleAcademicDepartmentFromDB,
};
