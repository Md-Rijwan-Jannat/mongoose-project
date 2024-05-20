import Joi from 'joi';

// Define the Joi validation schema for the name structure
const studentNameSchema = Joi.object({
  firstName: Joi.string()
    .regex(/^[A-Z][a-z]*$/)
    .required()
    .max(10)
    .trim()
    .messages({
      'string.pattern.base': 'First name must start with an uppercase letter.',
      'string.max': 'First name max length is 10 characters.',
      'string.empty': 'First name is required.',
    }),
  middleName: Joi.string()
    .regex(/^[A-Z][a-z]*$/)
    .allow('')
    .optional()
    .max(10)
    .trim()
    .messages({
      'string.pattern.base': 'Middle name must start with an uppercase letter.',
      'string.max': 'Middle name max length is 10 characters.',
    }),
  lastName: Joi.string()
    .regex(/^[A-Z][a-z]*$/)
    .required()
    .max(10)
    .trim()
    .messages({
      'string.pattern.base': 'Last name must start with an uppercase letter.',
      'string.max': 'Last name max length is 10 characters.',
      'string.empty': 'Last name is required.',
    }),
});

// Define the Joi validation schema for the guardian structure
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .required()
    .trim()
    .messages({
      'string.pattern.base':
        "Father's name must contain only alphabetic characters",
      'string.empty': "Father's name is required",
    }),
  fatherContactNo: Joi.string().required().trim().messages({
    'string.empty': "Father's contact number is required",
  }),
  fatherOccupation: Joi.string().required().trim().messages({
    'string.empty': "Father's occupation is required",
  }),
  motherName: Joi.string().required().trim().messages({
    'string.empty': "Mother's name is required",
  }),
  motherContactNo: Joi.string().required().trim().messages({
    'string.empty': "Mother's contact number is required",
  }),
  motherOccupation: Joi.string().required().trim().messages({
    'string.empty': "Mother's occupation is required",
  }),
});

// Define the Joi validation schema for the local guardian structure
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    'string.empty': "Local guardian's name is required",
  }),
  contactNo: Joi.string().required().trim().messages({
    'string.empty': "Local guardian's contact number is required",
  }),
  address: Joi.string().required().trim().messages({
    'string.empty': "Local guardian's address is required",
  }),
  email: Joi.string().email().required().trim().messages({
    'string.email': "Local guardian's email must be a valid email",
    'string.empty': "Local guardian's email is required",
  }),
});

// Define the main Joi validation schema for the student
const studentSValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    'string.empty': 'Student id number is required',
  }),
  password: Joi.string().trim().required().messages({
    'string.empty': 'Password is required',
  }),
  name: studentNameSchema.required().messages({
    'object.base': 'Student name is required',
  }),
  email: Joi.string().email().required().trim().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
  }),
  contactNo: Joi.string().required().trim().messages({
    'string.empty': 'Contact number is required',
  }),
  currentAddress: Joi.string().required().trim().messages({
    'string.empty': 'Current address is required',
  }),
  permanentAddress: Joi.string().required().trim().messages({
    'string.empty': 'Permanent address is required',
  }),
  emergencyContactNo: Joi.string().required().trim().messages({
    'string.empty': 'Emergency contact number is required',
  }),
  gender: Joi.string().valid('Male', 'Female').required().messages({
    'any.only': 'Gender must be one of [Male, Female]',
    'string.empty': 'Gender is required',
  }),
  religion: Joi.string()
    .valid('Islam', 'Hindu', 'Christian', 'Buddhist', 'Others')
    .required()
    .trim()
    .messages({
      'any.only':
        'Religion must be one of [Islam, Hindu, Christian, Buddhist, Others]',
      'string.empty': 'Religion is required',
    }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .trim()
    .optional(),
  localGuardian: localGuardianValidationSchema.required().messages({
    'object.base': 'Local guardian is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'object.base': 'Guardian is required',
  }),
  dateOfBirth: Joi.string().required().trim().messages({
    'string.empty': 'Date of birth is required',
  }),
  admissionFee: Joi.number().required().messages({
    'number.base': 'Admission fee must be a number',
    'any.required': 'Admission fee is required',
  }),
  admissionDate: Joi.date().required().messages({
    'date.base': 'Admission date must be a valid date',
    'any.required': 'Admission date is required',
  }),
  studentAvatar: Joi.string().required().trim().messages({
    'string.empty': 'Student avatar is required',
  }),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': 'Status must be one of [active, blocked]',
  }),
});

export default studentSValidationSchema;
