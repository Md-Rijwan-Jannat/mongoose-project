import { z } from "zod";
import { Days } from "./offeredCourse.constants";

const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;

const startTimeSchema = z
  .string({
    required_error: "Start time is required",
    invalid_type_error: "Start time must be a string",
  })
  .refine((time) => {
    return timeRegex.test(time);
  });

const endTimeSchema = z
  .string({
    required_error: "End time is required",
    invalid_type_error: "End time must be a string",
  })
  .refine((time) => {
    return timeRegex.test(time);
  });

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      offeredCourse: z.object({
        semesterRegistration: z.string({
          required_error: "Academic registration is required",
          invalid_type_error: "Academic Registration must be a string",
        }),
        academicDepartment: z.string({
          required_error: "Academic department is required",
          invalid_type_error: "Academic department must be a string",
        }),
        academicFaculty: z.string({
          required_error: "Academic faculty is required",
          invalid_type_error: "Academic faculty must be a string",
        }),
        course: z.string({
          required_error: "Course is required",
          invalid_type_error: "Course must be a string",
        }),
        faculty: z.string({
          required_error: "Faculty is required",
          invalid_type_error: "Faculty must be a string",
        }),
        maxCapacity: z.number({
          required_error: "Max capacity is required",
          invalid_type_error: "Max capacity must be a number",
        }),
        days: z.array(z.enum([...(Days as [string, ...string[]])]), {
          required_error: "Days is required",
          invalid_type_error: "Days must be string",
        }),
        session: z.number({
          required_error: "Session is required",
          invalid_type_error: "Session must be a number",
        }),
        startTime: startTimeSchema,
        endTime: endTimeSchema,
      }),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.offeredCourse.startTime}:00`);
        const end = new Date(`1970-01-01T${body.offeredCourse.endTime}:00`);

        return end > start;
      },
      { message: "Start time should be before end time" },
    ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      offeredCourse: z.object({
        faculty: z.string({
          required_error: "Faculty is required",
          invalid_type_error: "Faculty must be a string",
        }),
        maxCapacity: z.number({
          required_error: "Max capacity is required",
          invalid_type_error: "Max capacity must be a number",
        }),
        days: z.array(z.enum([...(Days as [string, ...string[]])]), {
          required_error: "Days is required",
          invalid_type_error: "Days must be string",
        }),
        startTime: startTimeSchema,
        endTime: endTimeSchema,
      }),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.offeredCourse.startTime}:00`);
        const end = new Date(`1970-01-01T${body.offeredCourse.endTime}:00`);

        return end > start;
      },
      { message: "Start time should be before end time" },
    ),
});

export const OfferedCourseValidation = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
