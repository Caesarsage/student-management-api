import { Response, Request, NextFunction } from 'express'
import { Student } from '../model/studentModel'
import { Subject } from '../model/subjectModel'
import { ErrorResponse } from '../utils/expressError'

export const createSubject = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { code, leadTutor, credit } = await request.body
    const maxSubject = 12

    const checkExistence = await Subject.findOne({ code })
    if (checkExistence) {
      console.log('already error')
      // return
      return next(new ErrorResponse('level already exited', 401))
    }

    const checkMaxSubject = await Subject.find({})

    if (maxSubject <= checkMaxSubject?.length) {
      console.log('Max subject reached')
      return next(new ErrorResponse('Max subject reached', 400))
    }
    const subject = await Subject.create({
      code,
      leadTutor,
      credit
    })
    response.status(200).json({ data: subject, msg: 'Successfully created' })
  } catch (error) {
    next(error)
  }
}

export const registerSubject = async (request: Request, response: Response, next: NextFunction) => {
  const { subjects} = await request.body
  const {id}= await request.params

  const maxSubjectPerStudent = 9
  const minSubjectPerStudent = 5

  try {
    if (subjects.length < minSubjectPerStudent) {
      return next(new ErrorResponse('Subject must be equal to or greater than 5', 422))
    }
    if (subjects.length >= maxSubjectPerStudent) {
      return next(new ErrorResponse('Subject must not be greater than 9', 422))
    }

    const student = await Student.findById(id)
    if (!student) {
      return next(new ErrorResponse('No student found', 404))
    }

    subjects.forEach(async (subject: { code: string }) => {
      const availableSubject = await Subject.findOne({ code: subject.code })

      if (availableSubject) {
        const registeredSubject =  await Student.findByIdAndUpdate(
          id,
          { $push: { registeredSubjects: availableSubject._id } },
          { new: true, useFindAndModify: false }
        )
        response.json({
          data: registeredSubject,
          message: 'successfully register your subjects'
        })
      } else {
        return null
      }
    })

  } catch (error) {
    next(error)
  }
}

export const getSubjects = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const all = await Subject.find({})

    if (!all) {
      return next(new ErrorResponse('No subjects found', 404))
    }
    return response.json({
      data: all,
      message: 'all subjects'
    })

  } catch (error) {
    return next(error)
  }
}


export const getSingleSubject = async (request: Request, response: Response, next: NextFunction) => {
  const { id } = await request.params || request.body
  try {
    const subject = await Subject.findById(id)

    if (!subject) {
      return next(new ErrorResponse('No subject found', 404))
    }

    return response.json({
      data: subject,
      message: 'Single subject found'
    })

  } catch (error) {
    return next(error)
  }
}

export const updateSubject = async (request: Request, response: Response, next : NextFunction) => {
  const { code, leadTutor, credit } = await request.body
  const { id } = await request.params || request.body
  try {

    const body = {
      code,
      leadTutor,
      credit
    }

    const subject = await Subject.findByIdAndUpdate(id, body, {new: true})

    if (!subject) {
      return next(new ErrorResponse('No subject found', 404))
    }

    return response.json({
      data: subject,
      message: 'Single student updated'
    })

  } catch (error) {
    return next(error)
  }
}

export const deleteSubject = async (request: Request, response: Response, next: NextFunction) => {
  const { id } = await request.params || request.body
  try {
    const subject = await Subject.findByIdAndDelete(id)

    if (!subject) {
      return next(new ErrorResponse('No subject found', 404))
    }

    return response.json({
      message: 'Single subject Deleted'
    })

  } catch (error) {
    return next(error)
  }
}