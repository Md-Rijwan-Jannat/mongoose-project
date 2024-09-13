import { z } from "zod";

//  password schema
const passwordSchema = z
  .string({
    invalid_type_error: "Password must be string",
  })
  .min(8)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  )
  .optional();

const FacultyNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name must not be empty" })
    .trim(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: "Last name must not be empty" })
    .trim(),
});

const createFacultySchemaValidation = z.object({
  body: z.object({
    password: passwordSchema,
    faculty: z.object({
      name: FacultyNameSchema,
      gander: z
        .enum(["male", "female", "other"])
        .or(
          z.string({ invalid_type_error: "Gender must be 'male' or 'female'" }),
        ),
      religion: z
        .enum(["Islam", "Hindu", "Christian", "Buddhist", "Others"])
        .or(z.string({ invalid_type_error: "Invalid religion" })),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .or(z.string({ invalid_type_error: "Invalid blood group" })),
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Invalid email format",
        })
        .email()
        .min(1, { message: "Email must not be empty" }),
      contactNo: z
        .string({ required_error: "Contact number is required" })
        .min(1, { message: "Contact number must not be empty" }),
      emergencyNo: z
        .string({ required_error: "Emergency contact number is required" })
        .min(1, { message: "Emergency contact number must not be empty" }),
      dateOfBirth: z
        .string({ required_error: "Date of birth is required" })
        .min(1, { message: "Date of birth must not be empty" }),
      occupation: z
        .string({ required_error: "Occupation is required" })
        .min(1, { message: "Occupation must not be empty" }),
      presentAddress: z
        .string({ required_error: "Present address is required" })
        .min(1, { message: "Present address must not be empty" }),
      permanentAddress: z
        .string({ required_error: "Permanent address is required" })
        .min(1, { message: "Permanent address must not be empty" }),
      academicDepartment: z.string({
        required_error: "Academic department is required",
      }),
      academicFaculty: z
        .string({
          required_error: "Academic faculty is required",
        })
        .optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

const updateFacultySchemaValidation = z.object({
  body: createFacultySchemaValidation.partial(),
});

export const FacultyValidation = {
  createFacultySchemaValidation,
  updateFacultySchemaValidation,
};
