import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    academicDepartment: z.object({
      name: z
        .string({
          required_error: "Academic department is required",
          invalid_type_error: "Academic department mus be a string",
        })

        .describe("Academic faculty name must be a string"),
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: createAcademicDepartmentValidationSchema.partial(),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
