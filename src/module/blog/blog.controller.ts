/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import { blogService } from './blog.service';
import { JwtPayload } from 'jsonwebtoken';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const user = req.user as JwtPayload;
  const result = await blogService.createBlogDB(body, user);
  if (result) {
    const { _id, title, content } = result;
    res.send({
      success: true,
      message: 'Blog created successfully',
      statusCode: StatusCodes.CREATED,
      data: { _id, title, content },
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).send({
      success: false,
      message: 'Something went wrong',
    });
  }
});
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const id = req.params.id;
  const user = req.user as JwtPayload;
  const result = await blogService.updateBlogDB(id, body, user);
  if (result) {
    const { _id, title, content, author } = result;
    res.send({
      success: true,
      message: 'Blog updated successfully',
      statusCode: StatusCodes.OK,
      data: { _id, title, content, author },
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).send({
      success: false,
      message: 'Blog not found',
    });
  }
});
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user as JwtPayload;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await blogService.deleteBlogDB(id, user);

  res.send({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});
const getBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogService.getBlogDB(req.query);

  res.send({
    success: true,
    message: 'Blogs fetched successfully',
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
