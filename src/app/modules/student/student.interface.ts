import { Model } from 'mongoose';

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
  password: string;
  name: IStudentName;
  email: string;
  contactNo: string;
  currentAddress: string;
  permanentAddress: string;
  emergencyContactNo: string;
  gender: 'Male' | 'Female';
  religion: 'Islam' | 'Hindu' | 'Christian' | 'Buddhist' | 'Others';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  localGuardian: ILocalGuardian;
  guardian: IGuardian;
  dateOfBirth: string;
  admissionFee: number;
  admissionDate: Date;
  studentAvatar: string;
  isActive?: 'active' | 'blocked';
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
