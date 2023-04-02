const router = require('express').Router()
const User = require('../models/User.model.js')
const isAuthenticated = require('../middlewares/isAuthenticated.js')

router.get('/users-list', isAuthenticated, async (req, res, next) => {
  try {
    const allUsers = await User.find()
    res.json(allUsers)
  } catch (error) {
    next(error)
  }
})

// @desc   Get user profile
// @route  GET /api/profile
// @access private, isAdmin
router.get('/profile', isAuthenticated, async (req, res, next) => {
  try {
    res.json({ userProfile: req.user })
  } catch (error) {
    next(error)
  }
})

// @desc   Edit/Update user profile
// @route  PATCH /api/edit
// @access private, isAdmin
router.patch('/edit', isAuthenticated, async (req, res, next) => {
  try {
    const { username, email, password, shippingAddress } = req.body
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, email, password, shippingAddress },
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
})

// @desc   delete user profile
// @route  DELETE /api/delete
// @access private, isAdmin
router.delete('/delete', async (req, res, next) => {
  try {
    const { password } = req.headers
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' })
    }
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).send({ error: 'パスワードが間違っています' })
    }
    await User.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
