import {} from 'mongoose';

export interface StudentName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface Guardian {
  fatherName: string;
  fatherVContactNo: string;
  fatherOccupation: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
}

export interface LocalGuardian {
  name: string;
  contactNo: string;
  address: string;
  email: string;
}

export interface Student {
  name: StudentName;
  email: string;
  contactNo: string;
  currentAddress: string;
  permanentAddress: string;
  emergencyContactNo: string;
  gender: 'Male' | 'Female';
  religion: 'Islam' | 'Hindu' | 'Christian' | 'Buddhist' | 'Others';
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: Guardian;
  localGuardian: LocalGuardian;
  dateOfBirth: string;
  admissionFee: number;
  admissionDate: Date;
  studentAvatar?: string;
  isActive: 'active' | 'blocked';
}
