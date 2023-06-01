import { Request, Response } from 'express';

export const home = (req: Request, res: Response) => {
  res.render('index.pug');
};

export const login = (req: Request, res: Response) => {
  res.render('login.pug');
};

export const register = (req: Request, res: Response) => {
  res.render('register.pug');
};
