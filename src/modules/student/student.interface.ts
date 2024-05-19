export interface TStudentName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface TGuardian {
  fatherName: string;
  fatherContactNo: string;
  fatherOccupation: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
}

export interface TLocalGuardian {
  name: string;
  contactNo: string;
  address: string;
  email: string;
}

export interface TStudent {
  name: TStudentName;
  email: string;
  contactNo: string;
  currentAddress: string;
  permanentAddress: string;
  emergencyContactNo: string;
  gender: 'Male' | 'Female';
  religion: 'Islam' | 'Hindu' | 'Christian' | 'Buddhist' | 'Others';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  localGuardian: TLocalGuardian;
  guardian: TGuardian;
  dateOfBirth: string;
  admissionFee: number;
  admissionDate: Date;
  studentAvatar: string;
  isActive?: 'active' | 'blocked';
}
