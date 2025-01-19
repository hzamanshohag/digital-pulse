/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleGenericError } from '../helpers/handleGenericError';
import { handleDuplicateError } from '../helpers/handleDuplicateError';
import { handleCastError } from '../helpers/handleCastError';
import { handleValidationError } from '../helpers/handleValidationError';
import { handleZodError } from '../helpers/handleZodError';
import { ZodError } from 'zod';
import { AppError } from '../helpers/AppError';

type TErrorSources = {
  path: string | number;
  message: string;
}[];

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let success = false;
  let message = 'Something went wrong!';
  let error;

  if (err instanceof ZodError) {
    handleZodError(err, res);
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  } else if (err.code && err.code === 11000) {
    handleDuplicateError(err, res);
  } else if (err instanceof AppError) {
    success = err.success;
    statusCode = err?.statusCode;
    message = err?.message;
    error = err;
  } else if (err instanceof Error) {
    handleGenericError(err, res);
  }
};
