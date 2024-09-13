import { z } from "zod";
import { userStatus } from "./user.constants";

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: "Password must be string" })
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    )
    .optional(),
});

const userStatusChangeValidationSchema = z.object({
  body: z.object({
    status: z.enum([...userStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  userValidationSchema,
  userStatusChangeValidationSchema,
};
