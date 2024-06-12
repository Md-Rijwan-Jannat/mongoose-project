import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacultyService } from "./faculty.service";

const getAllFaculties = catchAsync(async (req, res) => {
  console.log("This cookie refresh token", req.cookies);

  const result = await FacultyService.getAllFacultiesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties retrieved successfully!",
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyService.getSingleFacultyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty retrieved successfully!",
    data: result,
  });
});

const updateSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty: facultyData } = req.body;
  const result = await FacultyService.updateSingleFacultyIntoDB(
    id,
    facultyData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty updated successfully!",
    data: result,
  });
});

const deleteSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyService.deleteSingleFacultyIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty deleted successfully!",
    data: result,
  });
});

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateSingleFaculty,
  deleteSingleFaculty,
};
