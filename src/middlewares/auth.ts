
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../module/user/user.model';
import config from '../config';

const auth = (...requiredRole: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Authorization token missing or invalid',
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      `${config.jwt_access_secret}`,
    ) as JwtPayload;

    const { _id, role } = decoded;

    const user = await User.findOne({ _id });

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
