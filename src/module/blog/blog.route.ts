import { Router } from 'express';
import { blogController } from './blog.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import auth from '../../middlewares/auth';

const blogRouter = Router();

blogRouter.get('/', blogController.getBlog);
blogRouter.post(
  '/',
  auth('user'),
  validateRequest(BlogValidation.createBlogValidationSchema),
  blogController.createBlog,
);
blogRouter.patch(
  '/:id',
  auth('user'),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  blogController.updateBlog,
);
blogRouter.delete('/:id', auth('user'), blogController.deleteBlog);

export default blogRouter;
