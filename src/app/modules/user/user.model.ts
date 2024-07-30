import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../error/AppError";

export const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      select: 0,
    },
    needsChangePassword: {
      type: Boolean,
      default: true,
    },
    passwordCreatedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "student", "faculty"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save hook for password hashing
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const password = this.password;
      const saltRounds = Number(config.bcrypt_salt_rounds);
      this.password = await bcrypt.hash(password, saltRounds);
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

// Post-save hook
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.pre("save", async function (next) {
  const isExistUser = await User.findOne({
    name: this.id,
  });

  if (isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is already exists!");
  }

  next();
});

// this user is exists!
userSchema.statics.isUserExistingByCustomId = async function (id: string) {
  return await User.findOne({ id }).select("+password");
};

//  password is match
userSchema.statics.isPasswordMatch = async function (
  resendLoginPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(resendLoginPassword, hashPassword);
};

// is user blocked
userSchema.statics.isUserBlocked = async function (id: string) {
  const user = await User.findOne({ id }).select("status");
  return user ? user.status === "blocked" : false;
};

// user is deleted
userSchema.statics.isUserDeleted = async function (id: string) {
  const user = await User.findOne({ id }).select("isDeleted");
  return user ? user.isDeleted : false;
};

// check if password change then invalid jwt token
userSchema.statics.isJwtIssuedBeforePasswordChange = async function (
  passwordChangedTimestamp: number,
  passwordIssuedTimestamp: number,
) {
  return passwordChangedTimestamp > passwordIssuedTimestamp;

  // return passwordChangedTimestamp > passwordIssuedTimestamp;
};

export const User = model<IUser, UserModel>("User", userSchema);
