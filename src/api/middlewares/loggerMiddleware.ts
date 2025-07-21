import { Request, Response, NextFunction } from 'express';
import morgan from "morgan";
import logger from '@loaders/logger';

const loggerMiddleware = (req: Request, _res: Response, next: NextFunction) => {

  logger.http(`${req.method} ${req.url}`);

  next();
};

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => logger.http(message.trim()),
    },
  }
);

export {loggerMiddleware, morganMiddleware}