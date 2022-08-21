import { readConfig } from '../src/config'
import { db } from '../src/db/db'
import { Student } from '../src/model/studentModel'
import { acceptedLevels, firstName, gender } from './seedHelper'
import { lastName } from './seedHelper'


db(readConfig)

export const random = (val: string[]) => val[Math.floor(Math.random() * val.length)]

const seedDB = async () => {
  await Student.deleteMany({})
  for (let i = 0; i <= 9354; i++) {
    const student = new Student({
      name: `${random(firstName)} ${random(lastName)}`,
      gender: `${random(gender)}`,
      classLevel: `${random(acceptedLevels)}`
    })
    await student.save()
  }
}

seedDB()