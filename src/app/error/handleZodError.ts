import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericResponseError } from "../interface/error";
import { ThrowError } from "./throwError";

const handleZodError = (err: ZodError): TGenericResponseError => {
  const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = err instanceof ThrowError ? err.statusCode : 404;

  return {
    statusCode,
    message: "Validation Error",
    errorSources: errorSources,
  };
};

export const HandleZodError = handleZodError;
