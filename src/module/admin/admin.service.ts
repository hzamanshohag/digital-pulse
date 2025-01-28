import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../helpers/AppError';
import Blog from '../blog/blog.model';
import User from '../user/user.model';
const blockUserDB = async (id: string) => {
  try {
    const result = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true },
    );
    if (!result) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        false,
        'Failed to User blocked',
      );
    }
    return result;
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new AppError(StatusCodes.FORBIDDEN, false, 'Failed to User blocked');
  }
};
const deleteBlogDB = async (id: string) => {
  try {
    const result = await Blog.findByIdAndDelete(id);
    if (!result) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        false,
        'Failed to Blog deleted',
      );
    }
    return result;
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new AppError(StatusCodes.FORBIDDEN, false, 'Failed to Blog deleted');
  }
};

export const AdminService = {
  blockUserDB,
  deleteBlogDB,
};
