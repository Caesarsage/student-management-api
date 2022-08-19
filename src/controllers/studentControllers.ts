import { Response, Request, NextFunction } from 'express'
import { Student } from '../model/studentModel'

const acceptedLevels = ['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3']

function validateLevels(classLevel: string) {
  let acceptedLevel
  acceptedLevels.forEach((val)=>{
    if(classLevel.toUpperCase() !== val ) {
      return null
    }
    acceptedLevel = val
  })
  return acceptedLevel
}

export const registerStudent = async (request: Request, response : Response, next: NextFunction) => {
  const { name, gender, classLevel } = await request.body

  try{
    const acceptedLevel = validateLevels(classLevel)

    if(!acceptedLevel) {
      return response.json({
        data: null,
        message : `level must be either ${acceptedLevels}`
      })
    }

    const student = await new Student({
      name,
      gender,
      classLevel : acceptedLevel
    })

    student.id = student._id
    await student.save()

    if(!student) {
      return response.json({
        data: null,
        message: 'error creating student'
      })
    }
    return response.json({
      message:'successfully created student',
      data: student
    })

  } catch (error) {
    return next(error)
  }
}


export const getStudents = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const all = await Student.find({}).populate('registeredSubjects')

    if (!all) {
      return response.json({
        data: null,
        message: 'No student found'
      })
    }
    return response.json({
      data: all,
      message: 'All student found',
      totalLength: all.length
    })

  } catch (error) {
    return next(error)
  }
}

export const getSingleStudent = async (request: Request, response: Response, next: NextFunction) => {
  const { id } = await request.params || request.body
  try {
    const student = await Student.findById(id).populate('registeredSubjects')

    if (!student) {
      return response.json({
        data: null,
        message: 'No student found'
      })
    }

    return response.json({
      data: student,
      message: 'Single student found'
    })

  } catch (error) {
    return next(error)
  }
}

export const updateStudent = async (request: Request, response: Response, next : NextFunction) => {
  const { name, gender, classLevel } = await request.body
  const { id } = await request.params || request.body
  try {

    let acceptedLevel

    if(classLevel) {
      acceptedLevel = validateLevels(classLevel)
      return response.json({
        data: null,
        message : `level must be either ${acceptedLevels}`
      })
    }

    const body = {
      name,
      gender,
      classLevel : acceptedLevel
    }
    const student = await Student.findByIdAndUpdate(id, body, {new:true})

    if (!student) {
      return response.json({
        data: null,
        message: 'No student found'
      })
    }

    return response.json({
      data: student,
      message: 'Single student updated'
    })

  } catch (error) {
    return next(error)
  }
}

export const deleteStudent = async (request: Request, response: Response, next: NextFunction) => {
  const { id } = await request.params || request.body
  try {
    const student = await Student.findByIdAndDelete(id)

    if (!student) {
      return response.json({
        data: null,
        message: 'No student found'
      })
    }

    return response.json({
      message: 'Single student Deleted'
    })

  } catch (error) {
    return next(error)
  }
}