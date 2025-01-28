import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import { AppError } from '../../helpers/AppError';
import User from '../user/user.model';
import { ILoginUser, IRegisterUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerDB = async (payload: IRegisterUser) => {
  const result = await User.create(payload);
  return result;
};

const loginDB = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, false, 'Invalid credentials');
  }
  const userStatus = user?.isBlocked;
  if (userStatus === true) {
    throw new AppError(StatusCodes.UNAUTHORIZED, false, 'User is  blocked');
  }
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, false, 'Password is wrong');
  }

  const token = await jwt.sign(
    { _id: user?._id, role: user?.role },
    `${config.jwt_access_secret}`,
    {
      expiresIn: config.jwt_access_expires_in,
    },
  );

  const verifiedUser = {
    _id: user?._id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
    isBlocked: user?.isBlocked,
  };

  return {
    token,
    verifiedUser,
  };
};

export const AuthService = {
  registerDB,
  loginDB,
};
