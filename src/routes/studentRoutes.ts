import express, { Router } from 'express'
import {deleteStudent, getSingleStudent, getStudents, registerStudent, updateStudent } from '../controllers/studentControllers'

const studentRoute: Router = express.Router()

studentRoute
  .route('/students')
  .get(getStudents)

studentRoute
  .route('/student')
  .post(registerStudent)

studentRoute
  .route('/student/:id')
  .get(getSingleStudent)
  .put(updateStudent)
  .delete(deleteStudent)

export default studentRoute