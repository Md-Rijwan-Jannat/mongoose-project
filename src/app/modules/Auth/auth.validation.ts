import { z } from "zod";

const userValidationSchema = z
  .string({ invalid_type_error: "Password must be string" })
  .min(8)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  );

const authValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "This use id is required",
      invalid_type_error: "This user id must be a string",
    }),
    password: userValidationSchema,
  }),
});

const passwordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "Previous password is required",
      invalid_type_error: "This user id must be a string",
    }),
    newPassword: userValidationSchema,
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required",
      invalid_type_error: "refresh token must be a string",
    }),
  }),
});

export const AuthValidation = {
  authValidationSchema,
  passwordValidationSchema,
  refreshTokenValidationSchema,
};
