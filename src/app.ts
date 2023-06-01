import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import path from 'path';

import errorHandler from './controllers/error';
import authRouter from './routes/auth';
import userRouter from './routes/users';
import AppError from './utils/app-error';
import webPageRouter from './routes/webpages';

const app: Express = express();
const cwd = process.cwd();

app.use(cors());
app.use(cookieParser());
app.use(mongoSanitize());

app.set('view engine', 'pug');
app.set('views', path.join(cwd, 'src', 'views'));

app.use(express.json());
app.use(express.static(path.join(cwd, 'src', 'public')));

// Routes
app.use('/', webPageRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use('*', (req: Request, _: Response, next: NextFunction) => {
  return next(
    new AppError(
      ` ${req.method.toUpperCase()} ${req.originalUrl} is not found on this server`,
      400
    )
  );
});

app.use(errorHandler);

export default app;
