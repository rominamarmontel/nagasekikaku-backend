const router = require('express').Router()
const Product = require('../models/Product.model.js')

// @desc   Get all products
// @route  GET /api/products
// @access Public
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.find()
    res.json(allProducts)
  } catch (error) {
    next(error)
  }
})

// @desc   Get one product
// @route  GET /api/product/:id
// @access Public
router.get('/:id', async (req, res, next) => {
  try {
    const oneProduct = await Product.findById(req.params.id)
    res.json(oneProduct)
  } catch (error) {
    next(error)
  }
})

// @desc   Create one product
// @route  post /api/product/:id
// @access isAdmin
router.post('/create', async (req, res, next) => {
  try {
    const productToCreate = { ...req.body }
    const newProduct = await Product.create(productToCreate)
    res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
})

// @desc   Edit & Update one product
// @route  patch /api/product/:id
// @access isAdmin
router.patch('/edit/:id', async (req, res, next) => {
  try {
    const { id } = req.params.id
    const productToUpdate = { ...req.body }
    const updateProduct = await Product.findByIdAndUpdate(id, productToUpdate, {
      new: true,
    })
    res.status(202).json(updateProduct)
  } catch (error) {
    next(error)
  }
})

// @desc   Delete one product
// @route  patch /api/product/:id
// @access isAdmin
router.delete('/:id', async (req, res, next) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
