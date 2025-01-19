import { IBlog } from './blog.interface';
import Blog from './blog.model';
import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
const createBlogDB = async (payload: IBlog, user: JwtPayload) => {
  const { title, content } = payload;
  const { _id } = user;

  try {
    const result = await Blog.create({
      title,
      content,
      author: _id,
    });
    return result;
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Failed to create blog');
  }
};

const updateBlogDB = async (
  id: string,
  payload: Partial<IBlog>,
  user: JwtPayload,
) => {
  const blogData = await Blog.findById(id);
  if (!blogData) {
    throw new Error('Blog not found');
  }
  const userObjectId = user._id;
  const authorId = blogData?.author;
  const userObjectIdConverted = new Types.ObjectId(userObjectId);
  if (userObjectIdConverted.equals(authorId)) {
    const result = await Blog.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return result;
  } else {
    throw new Error('You are not authorized');
  }
};
const deleteBlogDB = async (id: string, user: JwtPayload) => {
  const blogData = await Blog.findById(id);
  if (!blogData) {
    throw new Error('Blog not found');
  }
  const userObjectId = user?._id;
  const authorId = blogData?.author;
  const userObjectIdConverted = new Types.ObjectId(userObjectId);
  if (userObjectIdConverted.equals(authorId)) {
    const result = await Blog.findByIdAndDelete(id);
    return result;
  } else {
    throw new Error('You are not authorized');
  }
};

// const getBlogDB = async (query: Record<string, unknown>) => {
//   const blogs = new QueryBuilder(Blog.find(), query)
//     .search()
//     .filter()
//     .sort()
//     .select();

//   const result = await blogs.modelQuery;
//   return result;
// };

const getBlogDB = async (query: Record<string, unknown>) => {
  const { search, author } = query;

  const querydata: Record<string, unknown> = {};
  if (search && typeof search === 'string') {
    querydata.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  const searchData = Blog.find(querydata);

  let sortStr = 'createdAt';

  if (query?.sortBy && query?.sortOrder) {
    const sortBy = query.sortBy;
    const sortOrder = query.sortOrder;
    sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
  }
  const sortData = await searchData.sort(sortStr);

  if (author && typeof author === 'string' && author.length === 24) {
    // Convert author string to ObjectId
    const authorId = new Types.ObjectId(author);

    // Query to find all blogs with the specified author
    const blogs = await Blog.aggregate([
      {
        $match: {
          author: authorId, // Match blogs by author ID
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          content: 1,
          author: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    // Return the result (array of objects)
    return blogs;
  }
  return sortData;
};

export const blogService = {
  createBlogDB,
  updateBlogDB,
  deleteBlogDB,
  getBlogDB,
};
