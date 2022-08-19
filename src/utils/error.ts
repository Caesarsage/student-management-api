import { Request, Response, NextFunction } from 'express'

function errorHandler(error : any , request : Request, response :Response, next : NextFunction){
  const { statusCode = 500 } = error
  if (!error.message) error.message = 'Something went wrong!!!, it\'s not your fault but ours'
  response.status(statusCode)
  response.json({
    statusCode,
    error
  })
}


export default errorHandler