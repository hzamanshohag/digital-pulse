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
  const { search, filter, sortBy = 'createdAt', sortOrder = 'desc' } = query;

  const querydata: Record<string, unknown> = {};
  if (search && typeof search === 'string') {
    querydata.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  if (filter && typeof filter === 'string' && filter.length === 24) {
    querydata.author = new Types.ObjectId(filter);
  } else if (filter) {
    throw new Error('Author not found');
  }

  const sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
  const searchData = Blog.find(querydata);

  const sortedData = await searchData
    .sort(sortStr)
    .select({
      _id: 1,
      title: 1,
      content: 1,
      author: 1,
    })
    .populate('author');
  return sortedData;
};

export const blogService = {
  createBlogDB,
  updateBlogDB,
  deleteBlogDB,
  getBlogDB,
};
