import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";
import { AcademicFaculty } from "./academicFaculty.model";

// Create academic faculty controller
const createAcademicFaculty = catchAsync(async (req, res) => {
  const { academicFaculty: academicFacultyData } = req.body;
  const result =
    await AcademicFacultyServices.createAcademicFacultyIntoDB(
      academicFacultyData,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty created successfully!",
    data: result,
  });
});

// Get all faculties controller
const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculties retrieved successfully!",
    data: result,
  });
});

// Get single faculty controller
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const academicFaculty = await AcademicFaculty.findOneOrThrowError(facultyId);
  const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(
    academicFaculty._id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty retrieved successfully!",
    data: result,
  });
});

// Get single faculty controller
const updateSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const { academicFaculty: academicFacultyData } = req.body;
  const result =
    await AcademicFacultyServices.updateSingleAcademicFacultyFromDB(
      facultyId,
      academicFacultyData,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty updated successfully!",
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateSingleAcademicFaculty,
};
