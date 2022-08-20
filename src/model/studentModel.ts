import { model, Schema } from 'mongoose'

interface iStudent {
  id: string
  name: string
  gender: string
  classLevel: string
  registeredSubjects: Array<Schema.Types.ObjectId>
}

const studentSchema = new Schema <iStudent> ({
  id: String,
  name : {
    type : String,
    required: true
  },
  classLevel: {
    type: String,
    required: true
  },
  gender : {
    type :String
  },
  registeredSubjects: [{
    type: Schema.Types.ObjectId,
    ref: 'Subject'
  }]
})

export const Student = model('Student', studentSchema)