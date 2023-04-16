const router = require('express').Router()
const Product = require('../models/Product.model.js')
const fileUpload = require('../config/cloudinary-config')
const isAuthenticated = require('../middlewares/isAuthenticated.js')

// @desc   Get all products
// @route  GET /api/products
// @access Public
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().sort({
      updatedAt: -1,
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})
// @desc   Get one product
// @route  GET /api/products/:id
// @access Public
router.get('/:id', async (req, res, next) => {
  try {
    const oneProduct = await Product.findById(req.params.id)
    if (!oneProduct) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json({ oneProduct })
  } catch (error) {
    next(error)
  }
})

// @desc   Create one product
// @route  post /api/products/create
// @access isAdmin
router.post(
  '/create',
  isAuthenticated,
  fileUpload.single('image'),
  async (req, res, next) => {
    try {
      const productToCreate = { ...req.body }
      if (req.file) {
        productToCreate.image = req.file.path
      }
      const createdProduct = await Product.create(productToCreate)
      res.status(201).json(createdProduct)
    } catch (error) {
      next(error)
    }
  }
)

// @desc   Edit & Update one product
// @route  patch /api/products/:id
// @access isAdmin
router.patch(
  '/:id',
  isAuthenticated,
  fileUpload.single('image'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const productToUpdate = { ...req.body }

      if (req.file) {
        productToUpdate.image = req.file.path
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        productToUpdate,
        { new: true }
      )
      res.status(202).json(updatedProduct)
    } catch (error) {
      next(error)
    }
  }
)

// @desc   Delete one product
// @route  patch /api/products/:id
// @access isAdmin
router.delete('/:id', isAuthenticated, async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
