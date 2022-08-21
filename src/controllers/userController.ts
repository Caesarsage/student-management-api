import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { readConfig } from '../config'
import { User } from '../model/userModel'
import { ErrorResponse } from '../utils/expressError'
import bcrypt from 'bcryptjs'

const matchPasswords = async function (password: any, hashPassword: any) {
  return await bcrypt.compare(password, hashPassword)
}

export const login = async (request : Request, response : Response, next: NextFunction) => {
  try {
    const { password, username} = request.body
    const user = await User.findOne({ username }).select('+password')
    const userToFrontend = await User.findOne({ username })
    !user && next(new ErrorResponse('User not found', 404))

    const match = await matchPasswords(password, user?.password)
    !match && next(new ErrorResponse('Invalid credentials', 401))

    const token = jwt.sign(
      {
        id: user?._id,
        username: user?.username,
        email: user?.email,
        isAdmin: user?.isAdmin,
      },
      readConfig.JWT_SECRET ,
      { expiresIn: readConfig.JWT_EXPIRY }
    )
    if (token)
      return response
        .status(200)
        .json({ msg: 'login successfully', data: userToFrontend, token })
  } catch (error) {
    next(error)
  }
}