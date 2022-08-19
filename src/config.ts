import env from 'dotenv'
env.config()

export interface Config {
  port?: string | number
  MONGO_URL: string
}

export const readConfig : Config = {
  port: process.env.PORT || 4000 ,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/student-management'
}