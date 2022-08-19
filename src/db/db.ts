import mongoose from 'mongoose'
import { Config } from '../config'




export const db = async (config: Config) => {
  let db
  try {
    if(process.env.NODE_ENV === 'test') {
      db = 'mongodb://localhost:27017/test'
    }
    if(process.env.NODE_ENV ==='development'){
      db = 'mongodb://localhost:27017/student-management'
    }
    db = config.MONGO_URL
    const connectMongoose = await mongoose.connect(db)
    if (!connectMongoose) {
      console.log('Database failed to connect')
    }
    console.log('Database Connected correctly to ', process.env.NODE_ENV, ' environment')
  } catch (err) {
    console.log('error occur')
    console.log(err)
  }
}