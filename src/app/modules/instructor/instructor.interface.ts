import { Model } from "mongoose";

export interface IInstructorName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IInstructorGuardian {
  fatherName: string;
  fatherContactNo: string;
  fatherOccupation: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
}

export interface IInstructorLocalGuardian {
  name: string;
  contactNo: string;
  address: string;
  email: string;
}

export interface IInstructor {
  id: string;
  name: IInstructorName;
  email: string;
  contactNo: string;
  currentAddress: string;
  permanentAddress: string;
  emergencyContactNo: string;
  gender: "Male" | "Female";
  religion: "Islam" | "Hindu" | "Christian" | "Buddhist" | "Others";
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  guardian: IInstructorGuardian;
  localGuardian: IInstructorLocalGuardian;
  dateOfBirth: string;
  admissionFee: number;
  admissionDate: Date;
  instructorAvatar: string;
  isActive: "active" | "blocked";
}

// create a custom static methods

export interface IInstructorModel extends Model<IInstructor> {
  // eslint-disable-next-line no-unused-vars
  isExistingInstructor(id: string): Promise<IInstructor | null>;
}

// create custom a instance methods

// export interface IInstructorMethods {
//   isUserExists(id: string): Promise<IInstructor | null>;
// }

// export type TInstructorModel = Model<
//   IInstructor,
//   Record<string, never>,
//   IInstructorMethods
// >;
