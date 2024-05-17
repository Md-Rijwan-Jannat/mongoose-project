import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (err: any, req: Request, res: Response) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal sever error',
  });
};

const routeErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.routeSpecific) {
    res.status(err.status || 400).json({
      success: false,
      message: err.message || 'Route-specific error occurred',
    });
  } else {
    next(err);
  }
};

export const globalErrors = { globalErrorHandler, routeErrorHandler };
