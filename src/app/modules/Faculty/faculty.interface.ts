/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface IFacultyName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IFaculty {
  id: string;
  user: Types.ObjectId;
  name: IFacultyName;
  gander: "male" | "female" | "other";
  religion: "Islam" | "Hindu" | "Christian" | "Buddhist" | "Others";
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  email: string;
  contactNo: string;
  emergencyNo: string;
  dateOfBirth: string;
  occupation: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
}

export interface FacultyModel extends Model<IFaculty> {
  isFaultyExists(id: string): Promise<IFaculty | null>;
}
