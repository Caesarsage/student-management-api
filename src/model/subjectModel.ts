import { model, Schema } from 'mongoose'

interface iSubject {
  code: string
  leadTutor: string
  credit: number
}

const subjectSchema = new Schema <iSubject> ({
  code : {
    type : String,
    required: true
  },
  leadTutor : {
    type:String
  },
  credit: {
    type: Number
  }
})

export const Subject = model('Subject', subjectSchema)