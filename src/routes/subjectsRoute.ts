import express, { Router } from 'express'
import { createSubject, deleteSubject, getSingleSubject, getSubjects, registerSubject, updateSubject } from '../controllers/subjectController'
import { authenticateUser, checkIfAdmin } from '../middleware/auth'

const subjectRoute: Router = express.Router()

subjectRoute.post('/subject', authenticateUser, checkIfAdmin, createSubject)

subjectRoute.route('/subjects')
  .get(getSubjects)

subjectRoute.route('/subject/:id')
  .get(getSingleSubject)
  .put(authenticateUser, checkIfAdmin, updateSubject)
  .delete(authenticateUser, checkIfAdmin, deleteSubject)

subjectRoute.post('/subject/student/:id', registerSubject)

export default subjectRoute