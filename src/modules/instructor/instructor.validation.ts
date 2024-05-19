import Joi from 'joi';

const instructorNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .regex(/^[A-Z][a-z]*$/)
    .required()
    .max(20)
    .trim()
    .messages({
      'string.pattern.base': 'First name must start with an uppercase letter.',
      'string.max': 'First name must be at most 20 characters.',
      'string.empty': 'First name is required.',
    }),
  middleName: Joi.string()
    .regex(/^[A-Z][a-z]*$/)
    .allow('')
    .optional()
    .max(20)
    .trim()
    .messages({
      'string.pattern.base': 'Middle name must start with an uppercase letter.',
      'string.max': 'Middle name must be at most 20 characters.',
    }),
  lastName: Joi.string()
    .regex(/^[A-Z][a-z]*$/)
    .required()
    .max(20)
    .trim()
    .messages({
      'string.pattern.base': 'Last name must start with an uppercase letter.',
      'string.max': 'Last name must be at most 20 characters.',
      'string.empty': 'Last name is required.',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().trim().messages({
    'string.empty': "Father's name is required.",
  }),
  fatherContactNo: Joi.string().required().trim().messages({
    'string.empty': "Father's contact number is required.",
  }),
  fatherOccupation: Joi.string().required().trim().messages({
    'string.empty': "Father's occupation is required.",
  }),
  motherName: Joi.string().required().trim().messages({
    'string.empty': "Mother's name is required.",
  }),
  motherContactNo: Joi.string().required().trim().messages({
    'string.empty': "Mother's contact number is required.",
  }),
  motherOccupation: Joi.string().required().trim().messages({
    'string.empty': "Mother's occupation is required.",
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    'string.empty': "Local guardian's name is required.",
  }),
  contactNo: Joi.string().required().trim().messages({
    'string.empty': "Local guardian's contact number is required.",
  }),
  address: Joi.string().required().trim().messages({
    'string.empty': "Local guardian's address is required.",
  }),
  email: Joi.string().email().required().trim().messages({
    'string.email': 'Provide a valid email.',
    'string.empty': "Local guardian's email is required.",
  }),
});

const instructorValidationSchema = Joi.object({
  name: instructorNameValidationSchema.required().messages({
    'object.base': 'Instructor name is required.',
  }),
  email: Joi.string().email().required().trim().messages({
    'string.email': 'Provide a valid email.',
    'string.empty': 'Email is required.',
  }),
  contactNo: Joi.string().required().trim().messages({
    'string.empty': 'Contact number is required.',
  }),
  currentAddress: Joi.string().required().trim().messages({
    'string.empty': 'Current address is required.',
  }),
  permanentAddress: Joi.string().required().trim().messages({
    'string.empty': 'Permanent address is required.',
  }),
  emergencyContactNo: Joi.string().required().trim().messages({
    'string.empty': 'Emergency contact number is required.',
  }),
  gender: Joi.string().valid('Male', 'Female').required().messages({
    'any.only': 'Gender must be Male or Female.',
    'string.empty': 'Gender is required.',
  }),
  religion: Joi.string()
    .valid('Islam', 'Hindu', 'Christian', 'Buddhist', 'Others')
    .required()
    .trim()
    .messages({
      'any.only':
        'Religion must be one of Islam, Hindu, Christian, Buddhist, or Others.',
      'string.empty': 'Religion is required.',
    }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .trim()
    .optional()
    .messages({
      'any.only':
        'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-.',
    }),
  guardian: guardianValidationSchema.required().messages({
    'object.base': 'Guardian is required.',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'object.base': 'Local guardian is required.',
  }),
  dateOfBirth: Joi.string().required().trim().messages({
    'string.empty': 'Date of birth is required.',
  }),
  admissionFee: Joi.number().required().messages({
    'number.base': 'Admission fee must be a number.',
    'any.required': 'Admission fee is required.',
  }),
  admissionDate: Joi.date().required().messages({
    'date.base': 'Admission date must be a valid date.',
    'any.required': 'Admission date is required.',
  }),
  instructorAvatar: Joi.string().required().trim().messages({
    'string.empty': 'Instructor avatar is required.',
  }),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': 'Status must be either active or blocked.',
  }),
});

export default instructorValidationSchema;
