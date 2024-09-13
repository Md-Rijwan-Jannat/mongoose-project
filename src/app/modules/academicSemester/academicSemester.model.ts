import { Schema, model } from "mongoose";
import {
  IAcademicSemester,
  IAcademicSemesterModel,
} from "./academicSemester.interface";
import {
  months,
  AcademicSemesterCode,
  AcademicSemesterName,
} from "./academicSemester.constants";
import httpStatus from "http-status";
import AppError from "../../error/AppError";

export const academicSemesterSchema = new Schema<
  IAcademicSemester,
  IAcademicSemesterModel
>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: true,
    },
    year: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: true,
    },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Semester can't be a duplicate
academicSemesterSchema.pre("save", async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this?.name,
    year: this?.year,
  });

  if (isSemesterExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Semester is already exists");
  }

  next();
});

// Unknown _id validation error for update
academicSemesterSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();

  const isSemesterExists = await AcademicSemester.findOne(query);

  if (!isSemesterExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "This semester doesn't exist!");
  }

  next();
});

// Custom static method to check existence
academicSemesterSchema.static(
  "findOneOrThrowError",
  async function (id: string) {
    const Semester: IAcademicSemester | null = await this.findOne({
      _id: id,
    });
    if (!Semester) {
      throw new AppError(httpStatus.NOT_FOUND, "This semester doesn't exist!");
    }
    return Semester;
  },
);

export const AcademicSemester = model<
  IAcademicSemester,
  IAcademicSemesterModel
>("AcademicSemester", academicSemesterSchema);
