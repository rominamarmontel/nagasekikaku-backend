const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Name is required.'],
      minLength: 3,
      maxLength: 25,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      select: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    shippingAddress: {
      postalCode: String,
      prefecture: String,
      city: String,
      town: String,
      addressA: String,
      addressB: String,
      phoneNumber: String,
    },
  },
  {
    timestamps: true,
  }
)

const User = model('User', userSchema)

module.exports = User
