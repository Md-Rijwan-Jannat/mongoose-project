import httpStatus from "http-status";
import { ThrowError } from "../../error/throwError";
import { IInstructor } from "./instructor.interface";
import { Instructor } from "./instructor.model";

// Create instructor
const createInstructorIntoDB = async (instructorData: IInstructor) => {
  if (await Instructor.isExistingInstructor(instructorData.id)) {
    throw new ThrowError(httpStatus.NOT_FOUND, "Instructor already exists");
  }
  const result = await Instructor.create(instructorData);
  return result;
};

// Get all instructor
const getAllInstructorFromDB = async () => {
  const result = await Instructor.find();
  return result;
};

// Get single instructor
const getSingleInstructorFromDB = async (_id: string) => {
  const result = await Instructor.findOne({ _id });
  return result;
};

export const InstructorServices = {
  createInstructorIntoDB,
  getAllInstructorFromDB,
  getSingleInstructorFromDB,
};
