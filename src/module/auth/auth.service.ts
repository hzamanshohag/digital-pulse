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
    throw new Error('Invalid credentials');
  }
  //   const userStatus = user?.userStatus;
  //   if (userStatus === 'inactive') {
  //     throw new Error('User is not active');
  //   }
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Password is wrong');
  }

  const token = await jwt.sign(
    { _id: user?._id, role: user?.role },
    'secret',
    { expiresIn: '1d' },
  );

  //          "name": "John Doe",
  //         "email": "john12@example.com",
  //         "password": "securepassword",
  //         "role": "user",
  //         "isBlocked": false,
  //         "_id": "678bbe867d8a3024f4507c54",
  //         "createdAt": "2025-01-18T14:45:26.108Z",
  //         "updatedAt": "2025-01-18T14:45:26.108Z",

  const verifiedUser = {
    _id: user?._id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
    isBlocked: user?.isBlocked,
    // createdAt: user?.createdAt,
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
