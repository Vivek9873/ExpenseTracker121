import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';


export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  let statusCode = 500;
  let message = 'Internal server error';
  let isOperational = false;


  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    isOperational = err.isOperational;
  }

  if (!isOperational || statusCode === 500) {
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      statusCode,
    });
  }


  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      details: err,
    }),
  });
};


export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.url} not found`,
  });
};
