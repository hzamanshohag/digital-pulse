import { Request, Response } from 'express';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await userService.createUser(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await userService.createAdmin(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Admin registered successfully',
    data: result,
  });
});

export const userController = {
  createUser,
  createAdmin,
};
