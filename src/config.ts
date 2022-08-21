import env from 'dotenv'
env.config()

export interface Config {
  port?: string | number
  test_port?: string | number
  MONGO_URL: string
  ADMIN_USERNAME: string | undefined
  ADMIN_PASSWORD: string | undefined
  JWT_SECRET?: any
  JWT_EXPIRY: number | undefined
  EMAIL: string | undefined
}

export const readConfig : Config = {
  port: process.env.PORT,
  test_port: process.env.TEST_PORT,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/student-management',
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  JWT_EXPIRY: Number(process.env.JWT_EXPIRY),
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL: process.env.EMAIL
}