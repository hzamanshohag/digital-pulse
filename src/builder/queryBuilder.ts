import { Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search() {
    const { search } = this.query;
    const querydata: Record<string, unknown> = {};
    if (search && typeof search === 'string') {
      querydata.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludingImportant = ['search', 'sortOrder', 'sortBy', 'filter'];
    excludingImportant.forEach((key) => delete queryObj[key]);
    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }

  sort() {
    let sortStr;
    if (this.query?.sortBy && this.query?.sortOrder) {
      const sortBy = this.query?.sortBy;
      const sortOrder = this.query?.sortOrder;
      sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
    }
    this.modelQuery = this.modelQuery.sort(sortStr || 'createdAt'); // Default sort by createdAt
    return this;
  }

  select() {
    let fields = '-__v';
    if (this?.query?.fields) {
      fields = (this?.query.fields as string)?.split(',').join(' ');
    }
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
