import httpStatus from "http-status";
import AppError from "../error/AppError";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // checking if token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!!");
    }

    let decoded;

    try {
      // checking if token is valid
      decoded = jwt.verify(
        token,
        config.jwt_access_token as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    const { role, userId, iat } = decoded;

    const user = await User.isUserExistingByCustomId(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
    }

    if (await User.isUserDeleted(user.id)) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!");
    }

    if (await User.isUserBlocked(user.id)) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
    }

    // Date format convert milliseconds
    const passwordCreateTimestamp =
      new Date(user?.passwordCreatedAt as Date).getTime() / 1000;

    if (
      user?.passwordCreatedAt &&
      (await User.isJwtIssuedBeforePasswordChange(
        passwordCreateTimestamp,
        iat as number,
      ))
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }
    req.user = decoded as JwtPayload;

    next();
  });
};

export const Auth = auth;
