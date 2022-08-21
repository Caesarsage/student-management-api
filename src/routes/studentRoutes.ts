import express, { Router } from 'express'
import {deleteStudent, getSingleStudent, getStudents, registerStudent, updateStudent } from '../controllers/studentControllers'
import { authenticateUser, checkIfAdmin } from '../middleware/auth'

const studentRoute: Router = express.Router()

studentRoute
  .route('/students')
  .get(getStudents)

studentRoute
  .route('/student')
  .post(authenticateUser, registerStudent)

studentRoute
  .route('/student/:id')
  .get(authenticateUser, getSingleStudent)
  .put(authenticateUser, checkIfAdmin, updateStudent)
  .delete(authenticateUser, checkIfAdmin, deleteStudent)

export default studentRoute