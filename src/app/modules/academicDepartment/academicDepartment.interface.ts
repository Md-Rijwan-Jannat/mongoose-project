/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface IAcademicDepartment {
  _id: string;
  name: string;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
}

export interface IAcademicDepartmentModel extends Model<IAcademicDepartment> {
  isDepartmentExists: (id: string) => Promise<IAcademicDepartment>;
}
