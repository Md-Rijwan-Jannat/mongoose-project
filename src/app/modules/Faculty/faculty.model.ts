import { Model, Schema, model } from "mongoose";
import { IFaculty, IFacultyName } from "./faculty.interface";

const facultyNameSchema = new Schema<IFacultyName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
});

const facultySchema = new Schema<IFaculty>(
  {
    id: { type: String, required: [true, "Faculty ID is required"] },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: {
      type: facultyNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Gender is required"],
    },
    religion: {
      type: String,
      enum: ["Islam", "Hindu", "Christian", "Buddhist", "Others"],
      required: [true, "Religion is required"],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: [true, "Blood group is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    contactNo: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    emergencyNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
      trim: true,
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of birth is required"],
      trim: true,
    },
    occupation: {
      type: String,
      required: [true, "Occupation is required"],
      trim: true,
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
      trim: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic department image is required"],
      ref: "AcademicDepartment",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic faculty image is required"],
      ref: "AcademicFaculty",
    },
    profileImage: {
      type: String,
      trim: true,
      default:
        "https://i.ibb.co/T4t96zZ/blank-profile-picture-973460-960-720.webp",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

//virtual
facultySchema.virtual("fullName").get(function () {
  return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName;
});

// Query Middleware
facultySchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

facultySchema.statics.isFacultyExists = async function (
  id: string,
): Promise<IFaculty | null> {
  return this.findOne({ id });
};

export const Faculty: Model<IFaculty> = model<IFaculty>(
  "Faculty",
  facultySchema,
);
