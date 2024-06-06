import z from "zod";
import {
  months,
  AcademicSemesterCode,
  AcademicSemesterName,
} from "./academicSemester.constants";

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    semester: z.object({
      name: z
        .enum([...AcademicSemesterName] as [string, ...string[]])
        .describe("Name filed is required"),
      year: z.string().describe("Date filed is required"),
      code: z
        .enum([...AcademicSemesterCode] as [string, ...string[]])
        .describe("Code filed is required"),
      startMonth: z
        .enum([...months] as [string, ...string[]])
        .describe("Month filed is required"),
      endMonth: z
        .enum([...months] as [string, ...string[]])
        .describe("Month filed is required"),
    }),
  }),
});

const updateAcademicSemesterValidationSchema = z.object({
  body: createAcademicSemesterValidationSchema.partial(),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
