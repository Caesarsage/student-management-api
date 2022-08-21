// User in this sense can be tutor or admin

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const { Schema } = mongoose

interface iUser {
  email: string
  password: string
  isAdmin: boolean
  username: string
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Please provide a valid mail',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 5,
    select: false,
  },
  username: {
    type: String,
    required: [true, 'Please provide a username'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
})

UserSchema.pre('save', async function (next) {
  // if password not modified
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

export const User = mongoose.model('User', UserSchema)