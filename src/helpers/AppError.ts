export class AppError extends Error {
  public statusCode: number;
  public success: boolean;

  constructor(
    statusCode: number,
    success: boolean,
    message: string,
    stack = '',
  ) {
    super(message);
    this.success = success;
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
