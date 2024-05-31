import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterService } from "./semester.service";
import { Semester } from "./semester.model";

// Create semester controller
const createSemester = catchAsync(async (req, res) => {
  const { semester: semesterData } = req.body;

  const result = await SemesterService.createSemesterIntoDB(semesterData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create semester successfully!",
    data: result,
  });
});

// get all semesters controller
const getAllSemester = catchAsync(async (req, res) => {
  const result = await SemesterService.getAllSemesterFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semesters retrieved successfully!",
    data: result,
  });
});

// get single semester controller
const getSingleSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const semester = await Semester.findOneOrThrowError(semesterId);
  const result = await SemesterService.getSingleSemesterFromDB(semester._id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester retrieved successfully!",
    data: result,
  });
});

// get all semester controller
const updateSingleSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const { semester: updateData } = req.body;
  const result = await SemesterService.updateSingleSemesterFromDB(
    semesterId,
    updateData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester updated successfully!",
    data: result,
  });
});

export const SemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSingleSemester,
};
