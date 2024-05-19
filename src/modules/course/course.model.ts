import { Schema, model } from 'mongoose';
import { Course } from './course.interface';

// Define the Instructor schema
const instructorSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  bio: { type: String },
  photoUrl: { type: String },
  contactEmail: { type: String, required: true },
});

// Define the Schedule schema
const scheduleSchema = new Schema({
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

// Define the Content schema
const contentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  resources: { type: [String] },
});

// Define the Course schema
const courseSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  duration: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true },
  instructor: { type: instructorSchema, required: true },
  schedule: { type: [scheduleSchema], required: true },
  contents: { type: [contentSchema], required: true },
  rating: { type: Number, min: 0, max: 5 },
  reviews: { type: [String] },
  prerequisites: { type: [String] },
  maxParticipants: { type: Number },
  currentParticipants: { type: Number },
});

export const CourseModel = model<Course>('Course', courseSchema);
