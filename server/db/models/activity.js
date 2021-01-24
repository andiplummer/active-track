const Sequelize = require('sequelize')
const db = require('../db')

const Activity = db.define('activity', {
  dateFrom: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dateTo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  distance: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
})

module.exports = Activity
