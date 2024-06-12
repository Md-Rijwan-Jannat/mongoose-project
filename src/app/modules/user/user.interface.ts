/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constants";

export interface IUser {
  id: string;
  password: string;
  needsChangePassword: boolean;
  passwordCreatedAt?: Date;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

// Define UserModel interface
export interface UserModel extends Model<IUser> {
  isUserExistingByCustomId(id: string): Promise<IUser | null>;
  isPasswordMatch(
    resendLoginPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
  isUserBlocked(id: string): Promise<boolean>;
  isUserDeleted(id: string): Promise<boolean>;
  isJwtIssuedBeforePasswordChange(
    passwordChangedTimestamp: number,
    passwordIssuedTimestamp: number,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
