const router = require('express').Router()
const Order = require('../models/Order.model')
const isAuthenticated = require('../middlewares/isAuthenticated')

// @desc   Get all orders
// @route  GET /api/orders
// @access private, isAdmin
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const allOrders = await Order.find({ user: req.user.id })
    res.json(allOrders)
  } catch (error) {
    next(error)
  }
})

// @desc   Get one order
// @route  GET /api/orders/:id
// @access private, isAdmin
router.get('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const oneOrder = await Order.findById(req.params.id)
    res.json(oneOrder)
  } catch (error) {
    next(error)
  }
})

// @desc   delete one order
// @route  DELETE /api/orders/:id
// @access private, isAdmin
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params.id
    const { user } = req.user.id
    await Order.findByIdAndDelete(id, user)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
