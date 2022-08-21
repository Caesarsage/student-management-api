import express, { Router } from 'express'
import { login } from '../controllers/userController'

const userRoute: Router = express.Router()

userRoute.post('/auth', login)


export default userRoute