import { Schema, model } from "mongoose";
import httpStatus from "http-status";
import {
  IAcademicDepartment,
  IAcademicDepartmentModel,
} from "./academicDepartment.interface";
import AppError from "../../error/AppError";

export const academicDepartmentSchema = new Schema<
  IAcademicDepartment,
  IAcademicDepartmentModel
>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicFaculty",
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

//  Unknown _id validation error
academicDepartmentSchema.pre("find", async function (next) {
  const query = this.getQuery();
  const isExistDepartment = await AcademicDepartment.findOne(query);

  if (!isExistDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, "This department doesn't exists!");
  }

  next();
});

// Department can't be a duplicate
academicDepartmentSchema.pre("save", async function (next) {
  const isExistDepartment = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isExistDepartment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This department is already exists!",
    );
  }

  next();
});

// Unknown _id validation error for update
academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();

  const isExistingDepartment = await AcademicDepartment.findOne(query);

  if (!isExistingDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, "This department doesn't exist!");
  }

  next();
});

// Custom static method to check existence
academicDepartmentSchema.static(
  "isDepartmentExists",
  async function (id: string) {
    const department: IAcademicDepartment | null = await this.findById(id);
    if (department) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "This department already exist!",
      );
    }
    return department;
  },
);

export const AcademicDepartment = model<
  IAcademicDepartment,
  IAcademicDepartmentModel
>("AcademicDepartment", academicDepartmentSchema);
