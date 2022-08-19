import express, { Router } from 'express'
import { createSubject, deleteSubject, getSingleSubject, getSubjects, registerSubject, updateSubject } from '../controllers/subjectController'

const subjectRoute: Router = express.Router()

subjectRoute.post('/subject', createSubject)

subjectRoute.route('/subjects')
  .get(getSubjects)

subjectRoute.route('/subject/:id')
  .get(getSingleSubject)
  .put(updateSubject)
  .delete(deleteSubject)

subjectRoute.post('/subject/student/:id', registerSubject)

export default subjectRoute