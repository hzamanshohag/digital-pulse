import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import { AdminService } from './admin.service';

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await AdminService.blockUserDB(userId);

  res.send({
    success: true,
    message: 'User blocked successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  await AdminService.deleteBlogDB(id);

  res.send({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

export const AdminController = {
  blockUser,
  deleteBlog,
};
