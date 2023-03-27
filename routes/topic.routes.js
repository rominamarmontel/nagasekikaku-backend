const router = require('express').Router()
const Topic = require('../models/Topic.model')

// @desc   Get all topics
// @route  GET /api/topics
// @access Public
router.get('/', async (req, res, next) => {
  try {
    const allTopics = await Topic.find()
    res.json(allTopics)
  } catch (error) {
    next(error)
  }
})

// @desc   Get one topic
// @route  GET /api/topic/:id
// @access Public
router.get('/:id', async (req, res, next) => {
  try {
    const oneTopic = await Topic.findById(req.params.id)
    res.json(oneTopic)
  } catch (error) {
    next(error)
  }
})

// @desc   Create one topic
// @route  post /api/topic/:id
// @access isAdmin
router.post('/create', async (req, res, next) => {
  try {
    const topicToCreate = { ...req.body }
    const newTopic = await Topic.create(topicToCreate)
    res.status(201).json(newTopic)
  } catch (error) {
    next(error)
  }
})

// @desc   Edit & Update one topic
// @route  patch /api/topic/:id
// @access isAdmin
router.patch('/edit/:id', async (req, res, next) => {
  try {
    const { id } = req.params.id
    const topicToUpdate = { ...req.body }
    const updateTopic = await Topic.findByIdAndUpdate(id, topicToUpdate, {
      new: true,
    })
    res.status(202).json(updateTopic)
  } catch (error) {
    next(error)
  }
})

// @desc   Delete one topic
// @route  patch /api/topic/:id
// @access isAdmin
router.delete('/:id', async (req, res, next) => {
  try {
    const deleteTopic = await Topic.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
