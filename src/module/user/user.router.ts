import { Router } from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const userRoute = Router();

userRoute.post(
  '/create-user',
  validateRequest(UserValidation.createUserValidationSchema),
  userController.createUser,
);
userRoute.post(
  '/create-admin',
  validateRequest(UserValidation.createUserValidationSchema),
  userController.createAdmin,
);

export default userRoute;
