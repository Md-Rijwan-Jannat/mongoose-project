import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { EnrolledCourseServices } from "./enrolledCourse.service";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../error/AppError";

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req?.user?.userId;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Enrolled course created successfully",
    data: result,
  });
});

const myEnrolledCourses = catchAsync(async (req, res) => {
  const studentId = req.user.userId;
  if (!studentId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid student ID");
  }

  const result = await EnrolledCourseServices.myEnrolledCourseIntoDB(
    studentId,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My enrolled course retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateEnrolledCourseMark = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EnrolledCourseServices.updateEnrolledCourseMark(
    userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Mark update Successfully",
    data: result,
  });
});

export const EnrolledCourseController = {
  createEnrolledCourse,
  myEnrolledCourses,
  updateEnrolledCourseMark,
};
