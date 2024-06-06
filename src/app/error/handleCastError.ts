import mongoose from "mongoose";
import { TErrorSources, TGenericResponseError } from "../interface/error";

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericResponseError => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 404;

  return {
    statusCode,
    message: "Incorrect _id error",
    errorSources: errorSources,
  };
};

export const HandleCasteError = handleCastError;
