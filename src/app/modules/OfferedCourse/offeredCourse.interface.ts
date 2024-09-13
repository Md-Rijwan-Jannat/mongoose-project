import { Types } from "mongoose";

export type TDays = "Sun" | "Mon" | "Tue" | "Thu" | "Wed" | "fri" | "Sat";

export interface IOfferedCourse {
  semesterRegistration: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  academicSemester?: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  days: TDays[];
  section: number;
  startTime: string;
  endTime: string;
}

export interface TSchedule {
  days: TDays[];
  startTime: string;
  endTime: string;
}
