import { Schema, model } from "mongoose";
import {
  ISemester,
  TMonths,
  TSemesterCode,
  TSemesterExam,
  TSemesterName,
} from "./semester.interface";

export const months: readonly TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const semesterName: readonly TSemesterName[] = [
  "Autumn",
  "Summer",
  "Fall",
] as const;
export const semesterCode: readonly TSemesterCode[] = [
  "01",
  "02",
  "03",
] as const;
export const semesterExam: readonly TSemesterExam[] = [
  "Meet Tram Exam",
  "Semester Final Exam",
] as const;

export const semesterSchema = new Schema<ISemester>(
  {
    name: {
      type: String,
      enum: semesterName,
      required: true,
    },
    year: {
      type: Date,
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
    exam: {
      type: String,
      enum: semesterExam,
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

export const Semester = model<ISemester>("Semester", semesterSchema);
