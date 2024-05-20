import { Schema, model } from 'mongoose';
import {
  IContent,
  ICourse,
  ICourseModel,
  IInstructor,
  ISchedule,
} from './course.interface';

// Define the Instructor schema
const instructorSchema = new Schema<IInstructor>({
  id: { type: Number, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  bio: { type: String, trim: true },
  photoUrl: { type: String, trim: true },
  contactEmail: { type: String, required: true, trim: true },
});

// Define the Schedule schema
const scheduleSchema = new Schema<ISchedule>({
  day: { type: String, required: true, trim: true },
  startTime: { type: String, required: true, trim: true },
  endTime: { type: String, required: true, trim: true },
});

// Define the Content schema
const contentSchema = new Schema<IContent>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  duration: { type: String, required: true, trim: true },
  resources: { type: [String] },
});

// Define the Course schema
const courseSchema = new Schema<ICourse, ICourseModel>({
  id: { type: Number, required: true, trim: true, unique: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  level: {
    type: String,
    required: true,
    trim: true,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  duration: { type: String, required: true, trim: true },
  startDate: { type: String, required: true, trim: true },
  endDate: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  instructor: { type: instructorSchema, required: true, trim: true },
  schedule: { type: [scheduleSchema], required: true, trim: true },
  contents: { type: [contentSchema], required: true, trim: true },
  rating: { type: Number, min: 0, max: 5, trim: true },
  reviews: { type: [String], trim: true },
  prerequisites: { type: [String], trim: true },
  maxParticipants: { type: Number, trim: true },
  currentParticipants: { type: Number, trim: true },
});

courseSchema.statics.isUserExists = async function (id: number) {
  const existingUser = await Course.findOne({ id });
  return existingUser;
};

export const Course = model<ICourse, ICourseModel>('Course', courseSchema);
