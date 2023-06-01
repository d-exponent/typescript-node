import { NextFunction, Request, Response } from 'express';

import { sign, verify } from 'jsonwebtoken';
import config from '../../config';
import { IGotAuthUser, MyJwtPayload } from '../../types';
import User from '../models/user';

const generateAccessToken = (id: Number): string => {
  return sign({ id }, config.JWT_SECRET);
};

const cookieManager = (id: Number, res: Response): string | null => {
  let token = null;

  if (id) {
    token = generateAccessToken(id);
  }

  res.cookie('jwt', token, {
    httpOnly: true,
    expires: new Date(Date.now() + config.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000),
    secure: config.NODE_ENV === 'production'
  });

  return token;
};

export const protect = async (req: IGotAuthUser, res: Response, next: NextFunction) => {
  // Get the token

  let token = undefined;

  // Check auth header for token
  const authHeader = req.headers['authorization'] as string;

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1] || undefined;
  } else {
    token = req.cookies.jwt || undefined;
  }

  if (!token) {
    return next(new Error('You are not logged in'));
  }

  // Decode the token
  const decoded = <MyJwtPayload>verify(token, config.JWT_SECRET);

  //check if user exits
  const currentUser = await User.findById(decoded.id);

  if (!currentUser)
    return next(new Error('This bearer of this token no longer exists in our system'));

  req.user = currentUser;
  res.locals.user = currentUser;

  return next();
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error('Provide the valid email and password');
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Provide the valid email address');
    }

    if (!user.validatePassword(password)) {
      throw new Error('Incorrect password');
    }

    res.status(200).json({
      success: true,
      data: user,
      token: cookieManager(user.id, res)
    });
  } catch (e) {
    res.status(500).json(JSON.parse(JSON.stringify(e)));
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const dbUser = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: { ...JSON.parse(JSON.stringify(dbUser)), password: undefined },
      token: cookieManager(dbUser.id, res)
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const logout = (req: Request, res: Response) => {
  // Destroy the cookie
  res.cookie('jwt', 'logged-out', {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: config.NODE_ENV === 'production'
  });

  res.send('Logged out successfully');
};
