import { NextFunction, Request, Response } from 'express';

const catchAsync = (func: any) => {
  return function (req: Request, res: Response, next: NextFunction) {
    func(req, res, next).catch(next)
  }
}


export default catchAsync