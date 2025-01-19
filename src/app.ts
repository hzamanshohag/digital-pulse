import express, { Request, Response } from 'express';
import userRoute from './module/user/user.router';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { StatusCodes } from 'http-status-codes';
import blogRouter from './module/blog/blog.route';
import authRoute from './module/auth/auth.route';
import adminRouter from './module/admin/admin.route';
const app = express();
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/blogs', blogRouter); //blogs
app.use('/api/admin', adminRouter); //admin

app.get('/', (req: Request, res: Response) => {
  res.send('Digital pulse server is running 🏃‍♂️‍➡️🎉⚡');
});

app.use(globalErrorHandler);

app.use('*', (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ success: false, message: 'Route not found' });
});

export default app;
