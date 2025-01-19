/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
export const handleZodError = (err: any, res: Response) => {
  const stacks = err.issues.map((item: any) => {
    return {
      path: item.path.join('>'),
      message: item.message,
    };
  });
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message,
    stack: stacks,
    error: err,
  });
};
