import { Router } from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';

const adminRouter = Router();

adminRouter.patch(
  '/users/:userId/block',
  auth('admin'),
  AdminController.blockUser,
);
adminRouter.delete('/blogs/:id', auth('admin'), AdminController.deleteBlog);

export default adminRouter;
