const router = require('express').Router()
const {Activity, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const userWorkouts = await Activity.findAll({
    })
    res.json(userWorkouts)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userWorkouts = await Activity.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(userWorkouts)
  } catch (err) {
    next(err)
  }
})

router.post('/add/:userId', async (req, res, next) => {
  try {
    // validate body
    await Activity.create({
      where: {
        userId: req.params.userId
      }
    })
    res.json(userWorkouts)
  } catch (err) {
    next(err)
  }
})