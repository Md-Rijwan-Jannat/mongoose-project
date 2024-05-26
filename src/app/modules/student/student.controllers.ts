/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

// Get all student
const grtAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Student are retrieved successfully",
    data: result,
  });
});

// Get single student
const getSingleStudent = catchAsync(async (req, res, next) => {
  const { _id } = req.query;
  const result = await StudentServices.getSingleStudentFromDB(_id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Student is retrieved successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res, next) => {
  const { _id } = req.query;
  const student = await StudentServices.deleteStudentFromDB(_id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is deleted",
    data: student,
  });
});

export const StudentControllers = {
  grtAllStudents,
  getSingleStudent,
  deleteStudent,
};
