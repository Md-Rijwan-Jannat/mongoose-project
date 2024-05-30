import { semesterCodeMapper } from "./semester.constants";
import { ISemester } from "./semester.interface";
import { Semester } from "./semester.model";

// Semester create service
const createSemesterIntoDB = async (payload: ISemester) => {
  if (semesterCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid semester code!");
  }

  const result = await Semester.create(payload);
  return result;
};

// get all semester service
const getAllSemesterFromDB = async () => {
  const result = await Semester.find();

  if (!result) {
    throw new Error("No semesters found!");
  }

  return result;
};

// get single semester service
const getSingleSemesterFromDB = async (_id: string) => {
  const result = await Semester.findOne({ _id });

  if (!result) {
    throw new Error("No semester found!");
  }

  return result;
};

// Update single semester details
const updateSingleSemesterFromDB = async (
  _id: string,
  payload: Partial<ISemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    semesterCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid semester code!");
  }
  const result = await Semester.findOneAndUpdate({ _id }, payload, {
    new: true,
  });

  if (!result) {
    throw new Error("No semester found!");
  }

  return result;
};

export const SemesterService = {
  createSemesterIntoDB,
  getAllSemesterFromDB,
  getSingleSemesterFromDB,
  updateSingleSemesterFromDB,
};
