
class AppError extends Error {
  status: number;
  isOperational: boolean;

  constructor(message: string, status: number) {
    super(message);

    if (status < 400 || status > 500) {
      throw new Error('status must between 400 and 500');
    }

    this.status = status;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
