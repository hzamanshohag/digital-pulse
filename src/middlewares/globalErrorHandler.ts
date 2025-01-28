import { AppError } from './../helpers/AppError';

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
import config from '../config';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  

  let error = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  if (err instanceof ZodError) {
    handleZodError(err, res);
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  } else if (err.code && err.code === 11000) {
    handleDuplicateError(err, res);
  }  else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    error = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    // handleGenericError(err, res);
    message = err?.message;
    error = [
      {
        path: '',
        message: err.message,
      },
    ];
  }
  res.status(statusCode).json({
    success: false,
    message,
    error,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};
