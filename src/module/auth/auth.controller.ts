import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from './auth.service';

const register = catchAsync(async (req: Request, res: Response) => {
  const { _id, name, email } = await AuthService.registerDB(req.body);

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: 'User registered successfully',
    data: { _id, name, email },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginDB(req.body);

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'Login successful',
    data: { token: result.token },
  });
});

export const AuthController = {
  register,
  login,
};
