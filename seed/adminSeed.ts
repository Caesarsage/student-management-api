import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { readConfig } from "../src/config"
import { db } from "../src/db/db"
import { User } from "../src/model/userModel"

db(readConfig)

const seedAdmin = async () => {
  await User.deleteMany()
  try {
    const admin = await User.findOne({ isAdmin: true })
    if (admin) return "admin account already exists"
    const newAdmin = await User.create({
      username: readConfig.ADMIN_USERNAME,
      isAdmin: true,
      email: readConfig.EMAIL,
      password: readConfig.ADMIN_PASSWORD,
    })

    const jwtToken = await jwt.sign(
      {
        id: newAdmin.id,
        username: newAdmin.username,
        email: newAdmin.email,
        isAdmin: newAdmin.isAdmin,
      },
      readConfig.JWT_SECRET,
      { expiresIn: readConfig.JWT_EXPIRY }
    )
    if (jwtToken)
      console.log({ msg: "register successfully", token: jwtToken, newAdmin})
  } catch (error) {
    console.log("error ===>", error)
    return console.log({ msg: "Error", token: error })
  }
}

seedAdmin().then(() => {
  mongoose.connection.close()
})
