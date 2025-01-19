import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title must be provided and must be a string',
    }),
    content: z.string({
      required_error: 'Content must be provided and must be a string',
    }),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title must be provided and must be a string',
      })
      .optional(),
    content: z
      .string({
        required_error: 'Content must be provided and must be a string',
      })
      .optional(),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
