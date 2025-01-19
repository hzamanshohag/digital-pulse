import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name must be provided and must be a string',
      })
      .min(3)
      .max(50),
    email: z
      .string({
        required_error: 'Email must be provided',
      })
      .email(),
    password: z.string({
      required_error: 'Password must be string',
    }),
    role: z.enum(['admin', 'user']).optional().default('user'),
    isBlocked: z.boolean().optional().default(false),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
};
