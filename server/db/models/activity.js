const Sequelize = require('sequelize')
const db = require('../db')

const Activity = db.define('activity', {
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
})

module.exports = Activity
