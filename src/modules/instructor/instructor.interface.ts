import {} from 'mongoose';

export interface InstructorName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface InstructorGuardian {
  fatherName: string;
  fatherVContactNo: string;
  fatherOccupation: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
}

export interface InstructorLocalGuardian {
  name: string;
  contactNo: string;
  address: string;
  email: string;
}

export interface Instructor {
  name: InstructorName;
  email: string;
  contactNo: string;
  currentAddress: string;
  permanentAddress: string;
  emergencyContactNo: string;
  gender: 'Male' | 'Female';
  religion: 'Islam' | 'Hindu' | 'Christian' | 'Buddhist' | 'Others';
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: InstructorGuardian;
  localGuardian: InstructorLocalGuardian;
  dateOfBirth: string;
  admissionFee: number;
  admissionDate: Date;
  instructorAvatar?: string;
  isActive: 'active' | 'blocked';
}
