import { Schema, model } from 'mongoose';
import config from '../../config';
import bcrypt from 'bcrypt';
import {
  IStudent,
  IStudentName,
  IGuardian,
  ILocalGuardian,
  TStudentModel,
  IStudentMethods,
} from './student.interface';

// Student name schema
const studentNameSchema = new Schema<IStudentName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
});

// Student guardian schema
const guardianSchema = new Schema<IGuardian>({
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

// Student local guardian schema
const localGuardianSchema = new Schema<ILocalGuardian>({
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

// Student main schema
const studentSchema = new Schema<IStudent, TStudentModel, IStudentMethods>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: studentNameSchema,
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
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  guardian: {
    type: guardianSchema,
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
  studentAvatar: {
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

// pre hook middleware
studentSchema.pre('save', async function (next) {
  try {
    console.log(this, 'pre hook: Instructor will be saved');
    const password = this.password;
    this.password = await bcrypt.hash(
      password,
      Number(config.password_salt_rounds),
    );
    next();
  } catch (error: any) {
    next(error);
  }
});

// post hook middleware
studentSchema.post('save', function () {
  console.log(this, 'post hook: Instructor is saved DB');
});

studentSchema.methods.isUserExists = async (id: string) => {
  const existingStudent = await Student.findOne({ id });
  return existingStudent;
};

export const Student: TStudentModel = model<IStudent, TStudentModel>(
  'Student',
  studentSchema,
);
