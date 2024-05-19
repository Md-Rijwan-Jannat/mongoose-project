import { Schema, model } from 'mongoose';
import {
  Instructor,
  InstructorName,
  InstructorGuardian,
  InstructorLocalGuardian,
} from './instructor.interface';

// Instructor name schema
const instructorNameSchema = new Schema<InstructorName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10,
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: 10,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10,
  },
});

// Instructor guardian schema
const guardianSchema = new Schema<InstructorGuardian>({
  fatherName: {
    type: String,
    required: true,
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
    trim: true,
  },
  motherName: {
    type: String,
    required: true,
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: true,
    trim: true,
  },
});

// Instructor local guardian schema
const localGuardianSchema = new Schema<InstructorLocalGuardian>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contactNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

// Instructor main schema
const instructorSchema = new Schema<Instructor>({
  name: {
    type: instructorNameSchema,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  contactNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  currentAddress: {
    type: String,
    required: true,
    trim: true,
  },
  permanentAddress: {
    type: String,
    required: true,
    trim: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  religion: {
    type: String,
    enum: ['Islam', 'Hindu', 'Christian', 'Buddhist', 'Others'],
    required: true,
    trim: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    trim: true,
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
    trim: true,
  },
  admissionFee: {
    type: Number,
    required: true,
  },
  admissionDate: {
    type: Date,
    required: true,
  },
  instructorAvatar: {
    type: String,
    required: true,
    trim: true,
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

export const InstructorModel = model<Instructor>(
  'Instructor',
  instructorSchema,
);
