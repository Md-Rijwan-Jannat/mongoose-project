import { Model, Types } from "mongoose";

export interface IStudentName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IGuardian {
  fatherName: string;
  fatherContactNo: string;
  fatherOccupation: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
}

export interface ILocalGuardian {
  name: string;
  contactNo: string;
  address: string;
  email: string;
}

export interface IStudent {
  id: string;
  semesterId: Types.ObjectId;
  user: Types.ObjectId;
  name: IStudentName;
  dateOfBirth: Date;
  gender: "Male" | "Female";
  religion: "Islam" | "Hindu" | "Christian" | "Buddhist" | "Others";
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  localGuardian: ILocalGuardian;
  guardian: IGuardian;
  profileImage: string;
  academicDepartment: string;
  isDeleted: boolean;
}

export interface IStudentMethods {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<IStudent | null>;
}

export type TStudentModel = Model<
  IStudent,
  Record<string, never>,
  IStudentMethods
>;
