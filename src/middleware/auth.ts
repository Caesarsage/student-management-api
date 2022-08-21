import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { readConfig } from "../config"

interface IGetUserAuthInfoRequest extends Request {
  user?: any // or any other type
}

export const authenticateUser = async (request: IGetUserAuthInfoRequest , response : Response, next: NextFunction) => {
  try {
    // check if there is an authorization token
    if (!request.headers.authorization) {
      return response.status(401).json({ message: "authorization header required" })
    }
    const splittedHeader = await request.headers.authorization.split(" ")
    if (splittedHeader[0] !== "Bearer") {
      return response
        .status(401)
        .json({ message: "authorization format is Bearer <token>" })
    }
    const token = await splittedHeader[1]
    // decode user
    const userToken = jwt.verify(token, readConfig.JWT_SECRET)
    if (!userToken)
      return response
        .status(403)
        .json({ message: "Invalid authorization token, please login" })
    // allow to continue with request
    request.user = userToken
    next()
  } catch (error) {
    response.status(501).json({ message: "error, bad request.", err: error })
  }
}

export const checkIfAdmin = async (request: IGetUserAuthInfoRequest, response: Response, next: NextFunction) => {
  try {
    if (!request.user.isAdmin) {
      return response.status(401).json({ message: "Protected Route, admin only" })
    }
    return next()
  } catch (error) {
    response
      .status(501)
      .json({ message: "An Error Occur", err: error })
  }
}
