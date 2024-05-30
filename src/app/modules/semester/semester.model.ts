import { Schema, model } from "mongoose";
import { ISemester } from "./semester.interface";
import { months, semesterCode, semesterName } from "./semester.constants";

export const semesterSchema = new Schema<ISemester>(
  {
    name: {
      type: String,
      enum: semesterName,
      required: true,
    },
    year: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      enum: semesterCode,
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

semesterSchema.pre("save", async function (next) {
  const isSemesterExists = await Semester.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExists) {
    throw new Error("Semester already exists!");
  }
  next();
});

export const Semester = model<ISemester>("Semester", semesterSchema);
