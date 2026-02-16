import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes';
import { requestLogger } from './middleware/logger.middleware';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import dotenv from "dotenv";
dotenv.config();


export const createApp = (): Application => {
  const app = express();

  app.use(cors({
    origin:process.env.CLIENT_URL
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);


  app.use('/', routes);


  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
