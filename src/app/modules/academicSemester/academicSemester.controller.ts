import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterService } from "./academicSemester.service";
import { AcademicSemester } from "./academicSemester.model";

// Create semester controller
const createAcademicSemester = catchAsync(async (req, res) => {
  const { semester: semesterData } = req.body;
  const result =
    await AcademicSemesterService.createAcademicSemesterIntoDB(semesterData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is created successfully!",
    data: result,
  });
});

// get all semesters controller
const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.getAllAcademicSemesterFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is retrieved successfully!",
    data: result,
  });
});

// get single semester controller
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const academicSemester =
    await AcademicSemester.findOneOrThrowError(semesterId);
  const result = await AcademicSemesterService.getSingleAcademicSemesterFromDB(
    academicSemester._id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is retrieved successfully!",
    data: result,
  });
});

// get all semester controller
const updateSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const { semester: semesterData } = req.body;

  const result =
    await AcademicSemesterService.updateSingleAcademicSemesterFromDB(
      semesterId,
      semesterData,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is updated successfully!",
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
