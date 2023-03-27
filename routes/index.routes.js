const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.json('All good in here')
})

router.use('/auth', require('./auth.routes'))

router.use('/products', require('./product.routes'))
router.use('/topics', require('./topic.routes'))
router.use('/user', require('./user.routes'))
router.use('/orders', require('./order.routes'))

router.use((error, req, res, next) => {
  console.error(error.stack)
  res.status(500).send('Something broke!')
})

module.exports = router
