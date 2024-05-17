import { Schema, model } from 'mongoose';
import {
  Guardian,
  Student,
  StudentName,
  LocalGuardian,
} from './student.interface';

// student name schema
const studentName = new Schema<StudentName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

// student guardian schema
const guardian = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherVContactNo: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
});

// student local guardian schema
const localGuardian = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// student main schema
const studentSchema = new Schema<Student>({
  name: studentName,
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  currentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  gender: ['Male', 'Female'],
  religion: ['Islam', 'Hindu', 'Christian', 'Buddhist', 'Others'],
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  guardian: guardian,
  localGuardian: localGuardian,
  dateOfBirth: { type: String, required: true },
  admissionFee: { type: Number, required: true },
  admissionDate: { type: Date, required: true },
  studentAvatar: { type: String, required: true },
  isActive: ['active', 'blocked'],
});

// create model
export const StudentModel = model<Student>('Student', studentSchema);
