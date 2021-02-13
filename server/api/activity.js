const router = require('express').Router();
const { ActivityEntry, User } = require('../db/models');
const {
  convertDateToTimestamp,
} = require('../../utils/dateTimeUtils');

module.exports = router;

router.get('/', async (req, res, next) => {
  // only admin access can get all workouts
  try {
    const userActivity = await ActivityEntry.findAll({});
    res.json(userActivity);
  } catch (err) {
    next(err);
  }
});

router.get('/all/grouped-by-user', async (req, res, next) => {
  try {
    const userActivity = await User.findAll({
      include: [
        {
          model: ActivityEntry,
          as: 'activityEntries',
        },
      ],
    });
    res.json(userActivity);
  } catch (error) {
    next(error);
  }
});

router.get('/group/:groupId', async (req, res, next) => {
  // verify user making request is part of group
  try {
    const userActivity = await ActivityEntry.findAll({});
    res.json(userActivity);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    // add security token to browser & verify user requesting data is user currently logged in
    const userActivity = await ActivityEntry.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.json(userActivity);
  } catch (err) {
    next(err);
  }
});

router.post('/add/:userId', async (req, res, next) => {
  try {
    const body = req.body;
    body.userId = req.params.userId;
    const createdActivity = await ActivityEntry.create(body);
    res.json(createdActivity);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  // add security token to browser & verify user requesting data is user currently logged in
  // verify correct param is entered
  try {
    await ActivityEntry.destroy({
      where: { id: req.params.id },
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
