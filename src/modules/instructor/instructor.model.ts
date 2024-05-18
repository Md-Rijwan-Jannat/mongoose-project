import { Schema, model } from 'mongoose';
import {
  Instructor,
  InstructorGuardian,
  InstructorLocalGuardian,
  InstructorName,
} from './instructor.interface';

// instructor name schema
const instructorName = new Schema<InstructorName>({
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

// instructor guardian schema
const guardian = new Schema<InstructorGuardian>({
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

// instructor local guardian schema
const localGuardian = new Schema<InstructorLocalGuardian>({
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

// instructor main schema
const instructorSchema = new Schema<Instructor>({
  name: instructorName,
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
  instructorAvatar: { type: String, required: true },
  isActive: ['active', 'blocked'],
});

// create model
export const InstructorModel = model<Instructor>(
  'Instructor',
  instructorSchema,
);
