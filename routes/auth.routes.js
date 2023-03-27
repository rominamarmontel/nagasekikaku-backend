const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')
const isAuthenticated = require('../middlewares/isAuthenticated.js')
const User = require('./../models/User.model.js')

/* We are prefixed by: /api/auth */

router.post('/signup', async (req, res, next) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'お名前、メールアドレス、パスワードを入力してください' })
  }

  try {
    const foundUser = await User.findOne({ username: username })
    if (foundUser) {
      return res.status(400).json({ message: 'ユーザーは既に登録されています' })
    }

    const generatedSalt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, generatedSalt)

    await User.create({
      username,
      email,
      password: hashedPassword,
    })
    return res.status(201).json({ message: '登録が完了しました' })
  } catch (error) {
    return res.status(500).json({
      message: '入力情報に間違いがあります。再度ご確認ください',
      error,
    })
  }
})

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'メールアドレスとパスワードを入力してください' })
  }

  try {
    const foundUser = await User.findOne({ email }).select('password')
    if (!foundUser) {
      return res.status(401).json({ message: 'メールアドレスが間違っています' })
    }

    const matchingPasswords = await bcrypt.compare(password, foundUser.password)
    if (!matchingPasswords) {
      return res.status(401).json({ message: 'パスワードが間違っています' })
    }

    const token = jsonWebToken.sign(
      { id: foundUser._id },
      process.env.TOKEN_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: '1d',
      }
    )
    return res.status(200).json({ token, message: 'Token created.' })
  } catch (error) {
    next(error)
  }
})

router.get('/verify', isAuthenticated, async (req, res, next) => {
  res.json(req.user)
})

module.exports = router
