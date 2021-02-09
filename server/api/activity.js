const router = require('express').Router();
const { Activity, User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  // only admin access can get all workouts
  try {
    const userWorkouts = await Activity.findAll({});
    res.json(userWorkouts);
  } catch (err) {
    next(err);
  }
});

router.get('/all/grouped-by-user', async (req, res, next) => {
  try {
    const userWorkouts = await User.findAll({
      include: [{
        model: Activity,
        as: 'activities'
          }],
    })
    res.json(userWorkouts)
  } catch (error) {
    next(error)
  }
})

router.get('/group/:groupId', async (req, res, next) => {
  // verify user making request is part of group
  try {
    const userWorkouts = await Activity.findAll({});
    res.json(userWorkouts);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    // add security token to browser & verify user requesting data is user currently logged in
    const userWorkouts = await Activity.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.json(userWorkouts);
  } catch (err) {
    next(err);
  }
});

// will need to add challengeId
router.post('/add/:userId', async (req, res, next) => {
  try {
    const body = req.body;
    body.userId = req.params.userId;
    const createdActivity = await Activity.create(body);
    res.json(createdActivity);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  // add security token to browser & verify user requesting data is user currently logged in
  // verify correct param is entered
  try {
    await Activity.destroy({
      where: { id: req.params.id },
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
