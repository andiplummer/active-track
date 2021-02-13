const Sequelize = require('sequelize')
const db = require('../db')

const ActivityEntry = db.define('activityEntry', {
  date: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  time: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false
  },
  distance: {
    type: Sequelize.FLOAT,
    allowNull: false,
    unique: false
  },
  totalCalories: {
    type: Sequelize.FLOAT,
    allowNull: true,
    unique: false,
  },
  activeCalories: {
    type: Sequelize.FLOAT,
    allowNull: true,
    unique: false,
  }
})

module.exports = ActivityEntry
