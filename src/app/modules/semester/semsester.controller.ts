import z from "zod";
import {
  months,
  semesterCode,
  semesterExam,
  semesterName,
} from "./semester.model";
import {
  TSemesterName,
  TSemesterCode,
  TMonths,
  TSemesterExam,
} from "./semester.interface";

export const createSemesterValidationSchema = z.object({
  body: z.object({
    name: z
      .enum(semesterName as [TSemesterName, ...TSemesterName[]])
      .describe("Name filed is required"),
    year: z.date().describe("Date filed is required"),
    code: z
      .enum(semesterCode as [TSemesterCode, ...TSemesterCode[]])
      .describe("Code filed is required"),
    startMonth: z
      .enum(months as [TMonths, ...TMonths[]])
      .describe("Month filed is required"),
    endMonth: z
      .enum(months as [TMonths, ...TMonths[]])
      .describe("Month filed is required"),
    exam: z
      .enum(semesterExam as [TSemesterExam, ...TSemesterExam[]])
      .describe("Month filed is required"),
  }),
});
