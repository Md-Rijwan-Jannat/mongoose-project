/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface IAdminName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IAdmin extends Document {
  id: string;
  user: Types.ObjectId;
  name: IAdminName;
  gender: "male" | "female";
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
  isDeleted: boolean;
}

export interface AdminModel extends Model<IAdmin> {
  isAdminExists(id: string): Promise<IAdmin | null>;
}
