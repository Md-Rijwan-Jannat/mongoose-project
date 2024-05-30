import z from "zod";
import { months, semesterCode, semesterName } from "./semester.constants";

const createSemesterValidationSchema = z.object({
  body: z.object({
    semester: z.object({
      name: z
        .enum([...semesterName] as [string, ...string[]])
        .describe("Name filed is required"),
      year: z.string().describe("Date filed is required"),
      code: z
        .enum([...semesterCode] as [string, ...string[]])
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

const updateSemesterValidationSchema = z.object({
  body: createSemesterValidationSchema.partial(),
});

export const SemesterValidation = {
  createSemesterValidationSchema,
  updateSemesterValidationSchema,
};
