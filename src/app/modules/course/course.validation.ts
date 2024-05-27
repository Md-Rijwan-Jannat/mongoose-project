import { z } from "zod";

// Define the Instructor schema
const instructorSchema = z.object({
  id: z
    .number()
    .nonnegative()
    .int()
    .refine((val) => val >= 0, {
      message: "Instructor id is required and must be a non-negative integer",
    }),
  name: z
    .string({
      required_error: "Instructor name is required",
    })
    .trim()
    .max(20, { message: "Instructor name must be at most 20 characters long" })
    .regex(/^[A-Z][a-z]*\s[A-Z][a-z]*$/, {
      message:
        "Instructor name must be format with each word capitalized and contain no numbers",
    }),
  bio: z.string().optional(),
  photoUrl: z.string().url().optional(),
  contactEmail: z.string().email({
    message:
      "Instructor contact email is required and must be a valid email address",
  }),
});

// Define the Schedule schema
const scheduleSchema = z.object({
  day: z.string({ required_error: "Schedule day is required" }),
  startTime: z.string({ required_error: "Schedule start time is required" }),
  endTime: z.string({ required_error: "Schedule end time is required" }),
});

// Define the Content schema
const contentSchema = z.object({
  title: z.string({ required_error: "Content title is required" }),
  description: z.string({ required_error: "Content description is required" }),
  duration: z.string({ required_error: "Content duration is required" }),
  resources: z.array(z.string()).optional(),
});

// Define the Course schema
const courseSchema = z.object({
  id: z
    .number()
    .nonnegative()
    .int()
    .refine((val) => val >= 0, {
      message: "Course id is required and must be a non-negative integer",
    }),
  password: z
    .string({
      required_error: "Password filed is required",
    })
    .min(8, { message: "Password longer then 8 character" }),
  title: z.string({ required_error: "Course title is required" }),
  description: z.string({ required_error: "Course description is required" }),
  category: z.string({ required_error: "Course category is required" }),
  level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    required_error:
      "Course level is required and must be one of 'Beginner', 'Intermediate', or 'Advanced'",
  }),
  duration: z.string({ required_error: "Course duration is required" }),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Course start date is required and must be a valid date",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Course end date is required and must be a valid date",
  }),
  price: z.number({
    required_error: "Course price is required and must be a number",
  }),
  instructor: instructorSchema,
  schedule: z.array(scheduleSchema, {
    required_error: "Course schedule is required",
  }),
  contents: z.array(contentSchema, {
    required_error: "Course contents are required",
  }),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional(),
  maxParticipants: z.number().optional(),
  currentParticipants: z.number().optional(),
});

export default courseSchema;
