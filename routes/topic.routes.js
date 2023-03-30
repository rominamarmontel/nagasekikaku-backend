const router = require('express').Router()
const Topic = require('../models/Topic.model.js')
const fileUpload = require('../config/cloudinary-config')

// @desc   Get all topics
// @route  GET /api/topics
// @access Public
router.get('/', async (req, res, next) => {
  try {
    const topics = await Topic.find().sort({ updatedAt: -1 })
    res.json(topics)
  } catch (error) {
    next(error)
  }
})

// @desc   Get one topic
// @route  GET /api/topics/:id
// @access Public
router.get('/:id', async (req, res, next) => {
  try {
    const oneTopic = await Topic.findById(req.params.id)
    res.json({ oneTopic })
  } catch (error) {
    next(error)
  }
})

// @desc   Create one topic
// @route  post /api/topics/create
// @access isAdmin
router.post(
  '/create',
  /* IS ADMIN, */ fileUpload.single('image'),
  async (req, res, next) => {
    try {
      const topicToCreate = { ...req.body }
      if (req.file) {
        topicToCreate.image = req.file.path
      }
      const createdTopic = await Topic.create(topicToCreate)
      res.status(201).json(createdTopic)
    } catch (error) {
      next(error)
    }
  }
)

// @desc   Edit & Update one topic
// @route  patch /api/topics/:id
// @access isAdmin
router.patch(
  '/:id',
  /* IS ADMIN, */ fileUpload.single('image'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const topicToUpdate = { ...req.body }

      if (req.file) {
        topicToUpdate.image = req.file.path
      }

      const updatedTopic = await Topic.findByIdAndUpdate(id, topicToUpdate, {
        new: true,
      })
      res.status(202).json(updatedTopic)
    } catch (error) {
      next(error)
    }
  }
)

// @desc   Delete one topic
// @route  patch /api/topics/:id
// @access isAdmin
router.delete(
  '/:id',
  /* IS ADMIN, */ async (req, res, next) => {
    try {
      await Topic.findByIdAndDelete(req.params.id)
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
