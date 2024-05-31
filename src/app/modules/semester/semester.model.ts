import { Schema, model } from "mongoose";
import { ISemester, ISemesterModel } from "./semester.interface";
import { months, semesterCode, semesterName } from "./semester.constants";

export const semesterSchema = new Schema<ISemester, ISemesterModel>(
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

// Semester can't be a duplicate
semesterSchema.pre("save", async function (next) {
  const isExistSemester = await Semester.findOne({
    name: this.name,
  });

  if (isExistSemester) {
    throw new Error("This semester is already exists!");
  }

  next();
});

// Unknown _id validation error for update
semesterSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();

  const isExistingSemester = await Semester.findOne(query);

  if (!isExistingSemester) {
    throw new Error("This semester doesn't exist!");
  }

  next();
});

// Custom static method to check existence
semesterSchema.static("findOneOrThrowError", async function (id: string) {
  const Semester: ISemester | null = await this.findOne({
    _id: id,
  });
  if (!Semester) {
    throw new Error("This semester doesn't exist!");
  }
  return Semester;
});

export const Semester = model<ISemester, ISemesterModel>(
  "Semester",
  semesterSchema,
);
