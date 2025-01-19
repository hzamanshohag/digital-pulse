import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import { blogService } from './blog.service';
import { JwtPayload } from 'jsonwebtoken';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const user = req.user as JwtPayload;
  const result = await blogService.createBlogDB(body, user);

  res.send({
    success: true,
    message: 'Blog created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const id = req.params.id;
  const user = req.user as JwtPayload;
  const result = await blogService.updateBlogDB(id, body, user);

  res.send({
    success: true,
    message: 'Blog updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
   const user = req.user as JwtPayload;
  const result =await blogService.deleteBlogDB(id, user);

  res.send({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
const getBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogService.getBlogDB(req.query);

  res.send({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// const getTours = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await tourService.getTours(req.query);

//     res.send({
//       success: true,
//       message: 'Tours get successfully',
//       result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const getSingleTour = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const result = await tourService.getSingleTour(id);

//     res.send({
//       success: true,
//       message: 'Tour get successfully',
//       result,
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       message: 'Something went wrong',
//       error,
//     });
//   }
// };

// const updateTour = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const body = req.body;
//     const result = await tourService.updateTour(id, body);

//     res.send({
//       success: true,
//       message: 'Tour updated successfully',
//       result,
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       message: 'Something went wrong',
//       error,
//     });
//   }
// };
// const deleteTour = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const result = await tourService.deleteTour(id);

//     res.send({
//       success: true,
//       message: 'Tour deleted successfully',
//       result,
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       message: 'Something went wrong',
//       error,
//     });
//   }
// };
// const getNextSchedule = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const result = await tourService.getNextSchedule(id);

//     res.send({
//       success: true,
//       message: 'Tour deleted successfully',
//       result,
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       message: 'Something went wrong',
//       error,
//     });
//   }
// };

export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
};
