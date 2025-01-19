import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../module/user/user.model';

const auth = (...requiredRole: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('You are not authorized');
    }

    const decoded = jwt.verify(token, 'secret') as JwtPayload;

    const { _id, role } = decoded;

    const user = await User.findOne({ _id});

    if (!user) {
      throw new Error('User not found');
    }
    if (requiredRole && !requiredRole.includes(role)) {
      throw new Error('You are not authorized');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
