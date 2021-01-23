const router = require('express').Router()
const {Workout, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const userWorkouts = await Workout.findAll({
    })
    res.json(userWorkouts)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userWorkouts = await Workout.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(userWorkouts)
  } catch (err) {
    next(err)
  }
})

router.get('/ytd/:userId', async (req, res, next) => {
  try {
    const userWorkouts = await Workout.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(userWorkouts)
  } catch (err) {
    next(err)
  }
})