import { Iuser } from './user.interface';
import User from './user.model';

const createUser = async (payload: Iuser): Promise<Iuser> => {
  const result = await User.create(payload);
  return result;
};
const createAdmin = async (payload: Iuser): Promise<Iuser> => {
  payload.role = 'admin';
  const result = await User.create(payload);
  return result;
};

export const userService = {
  createUser,
  createAdmin,
};
