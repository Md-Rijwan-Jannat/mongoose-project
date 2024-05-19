export interface TInstructorName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface TInstructorGuardian {
  fatherName: string;
  fatherContactNo: string;
  fatherOccupation: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
}

export interface TInstructorLocalGuardian {
  name: string;
  contactNo: string;
  address: string;
  email: string;
}

export interface TInstructor {
  name: TInstructorName;
  email: string;
  contactNo: string;
  currentAddress: string;
  permanentAddress: string;
  emergencyContactNo: string;
  gender: 'Male' | 'Female';
  religion: 'Islam' | 'Hindu' | 'Christian' | 'Buddhist' | 'Others';
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: TInstructorGuardian;
  localGuardian: TInstructorLocalGuardian;
  dateOfBirth: string;
  admissionFee: number;
  admissionDate: Date;
  instructorAvatar: string;
  isActive: 'active' | 'blocked';
}
