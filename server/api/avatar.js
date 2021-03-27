const router = require('express').Router();
const { Avatar } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
  // only admin access can get all workouts
  try {
    const avatars = await Avatar.findAll({});
    res.json(avatars);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  // only admin access can get all workouts
  try {
    const avatar = await Avatar.findAll({
      where: { id: req.params.id }
    });
    res.json(avatar);
  } catch (err) {
    next(err);
  }
});