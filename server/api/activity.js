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
    const body = req.body
    const userId = req.params.userId
    const bodyKeys = Object.keys(body)
    if (bodyKeys.length === 3 && bodyKeys.includes('dateFrom') && bodyKeys.includes('dateTo') && bodyKeys.includes('distance')) {
      body.userId = userId
      const createdActivity = await Activity.create({
        dateFrom: req.body.dateFrom,
        dateTo: req.body.dateTo,
        distance: req.body.distance,
        userId: userId
      })
      res.json(createdActivity)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/update:userId', async (req, res, next) => {
  try {
    
  } catch (err) {
    next(err)
  }
})