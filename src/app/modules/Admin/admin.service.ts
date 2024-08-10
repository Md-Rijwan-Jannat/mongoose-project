import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { adminSearchableFields } from "./admin.constants";

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const filterQueryBuilder = new QueryBuilder(Admin.find(), query)
    .search(adminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await filterQueryBuilder.modelQuery;
  const meta = await filterQueryBuilder.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleAdminFromDB = async (id: string) => {
  return await Admin.findById(id);
};

const updateSingleAdminIntoDB = async (
  id: string,
  payload: Partial<IAdmin>,
) => {
  const { name, ...remainingData } = payload;

  const modifiedAdminData: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedAdminData[`name.${key}`] = value;
    }
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(id, modifiedAdminData, {
      new: true,
      session,
    });

    if (!updatedAdmin) {
      throw new AppError(httpStatus.NOT_FOUND, "Admin not found!");
    }

    await session.commitTransaction();
    return updatedAdmin;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Admin update failed!",
    );
  } finally {
    session.endSession();
  }
};

const deleteSingleAdminIntoDB = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.NOT_FOUND, "Admin not found!");
    }

    const deletedUser = await User.findByIdAndUpdate(
      deletedAdmin.user,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.NOT_FOUND, "User deletion failed!");
    }

    await session.commitTransaction();
    return deletedAdmin;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "User deletion failed!",
    );
  } finally {
    session.endSession();
  }
};

export const AdminService = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateSingleAdminIntoDB,
  deleteSingleAdminIntoDB,
};
