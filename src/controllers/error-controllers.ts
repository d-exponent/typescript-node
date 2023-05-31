
import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import AppError from '../utils/app-error'


const errorHandler = (err: AppError | Error  , req: Request, res: Response, next: NextFunction) => {

  // PRODUCTION
  if(config.NODE_ENV === 'production'){
    if(err instanceof AppError){
      return res.status(err.status).json({
        message: err.message,
        isOperational: err.isOperational
      })
    }
    
    res.status(500).json({message: "Something went wrong", isOperational: false})
  }
  
  if(config.NODE_ENV !== 'production'){ 
    return res.json(err)
  }
  next()
}

export default errorHandler