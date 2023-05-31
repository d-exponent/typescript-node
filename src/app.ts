import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { Express, NextFunction, Request, Response } from 'express';
import mongoSanitize from 'express-mongo-sanitize'
import path from 'path';

import errorHandler from './controllers/error-controllers';
import userRouter from './routes/users';
import authRouter from './routes/auth'
import AppError from './utils/app-error';

const app: Express = express();

app.use(cors())
app.use(cookieParser())
app.use(mongoSanitize())

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public' )))

// Routes
app.use('/auth', authRouter)
app.use('/users', userRouter)


app.get('/', (req: Request, res: Response) => {  
  res.render('index.pug')
})

app.get('/login', (req: Request, res: Response) => {  
  res.render('login.pug')
})

app.get('/register', (req: Request, res: Response) => {  
  res.render('register.pug')
})

app.use("*", (req:Request, res: Response, next: NextFunction)=>{
  return next(new AppError(` ${req.method.toUpperCase()} ${req.originalUrl} is not found on this server`, 400))
})

app.use(errorHandler)

export default app;
