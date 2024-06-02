import mongoose from "mongoose";
import { TErrorSource, TGenericResponseError } from "../interface/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericResponseError => {
  const errorSources: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val.message,
      };
    },
  );

  const statusCode = 404;

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export const HandleValidationError = handleValidationError;
