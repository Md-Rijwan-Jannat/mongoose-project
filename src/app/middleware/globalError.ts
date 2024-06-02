/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
import { HandleZodError } from "../error/handleZodError";
import { TErrorSource } from "../interface/error";
import { ThrowError } from "../error/throwError";
import { ErrorRequestHandler } from "express";
import config from "../config";
import { ZodError } from "zod";
import { HandleValidationError } from "../error/handleValidationError";
import { HandleCasteError } from "../error/handleCastError";
import { HandleDuplicateFiledError } from "../error/handleDuplicateFiledError";

// global error handler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err instanceof ThrowError ? err.statusCode : 404;
  let message = err.message || "Internal server error";

  let errorSources: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = HandleZodError(err);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorSources = simplifiedError?.errorSources);
  } else if (err?.name === "ValidationError") {
    const simplifiedError = HandleValidationError(err);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorSources = simplifiedError?.errorSources);
  } else if (err?.name == "CastError") {
    const simplifiedError = HandleCasteError(err);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorSources = simplifiedError?.errorSources);
  } else if (err?.errorResponse?.code == 11000) {
    const simplifiedError = HandleDuplicateFiledError(err);
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorSources = simplifiedError?.errorSources);
  }

  return res.status(statusCode).json({
    status: statusCode,
    success: false,
    message: message,
    errorSources: errorSources,
    error: err,
    stack: config.node_env === "development" ? err.stack : null,
  });
};

export const GlobalError = globalErrorHandler;
