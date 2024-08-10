import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins retrieved successfully!",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.getSingleAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin retrieved successfully!",
    data: result,
  });
});

const updateSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin: adminData } = req.body;
  const result = await AdminService.updateSingleAdminIntoDB(id, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin updated successfully!",
    data: result,
  });
});

const deleteSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.deleteSingleAdminIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully!",
    data: result,
  });
});

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateSingleAdmin,
  deleteSingleAdmin,
};
