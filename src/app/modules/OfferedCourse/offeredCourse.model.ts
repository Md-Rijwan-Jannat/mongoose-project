import { Schema, model } from "mongoose";
import { IOfferedCourse } from "./offeredCourse.interface";
import { Days } from "./offeredCourse.constants";

export const offeredCourseSchema = new Schema<IOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: [true, "Semester registration id is required"],
      trim: true,
      ref: "SemesterRegistration",
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic semester id is required"],
      trim: true,
      ref: "AcademicSemester",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic department id is required"],
      trim: true,
      ref: "AcademicDepartment",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic faculty id is required"],
      trim: true,
      ref: "AcademicFaculty",
    },
    course: {
      type: Schema.Types.ObjectId,
      required: [true, "course id is required"],
      trim: true,
      ref: "Course",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: [true, "Faculty id is required"],
      trim: true,
      ref: "Faculty",
    },
    maxCapacity: {
      type: Number,
      required: [true, "Max capacity is required"],
      trim: true,
    },
    days: [
      {
        type: String,
        enum: Days,
      },
    ],
    section: {
      type: Number,
      required: [true, "Session is required"],
      trim: true,
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
      trim: true,
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const OfferedCourse = model<IOfferedCourse>(
  "OfferedCourse",
  offeredCourseSchema,
);
