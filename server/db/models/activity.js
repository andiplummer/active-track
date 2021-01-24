const Sequelize = require('sequelize')
const db = require('../db')

const Activity = db.define('activity', {
  entryDate: {
    type: Sequelize.INTEGER,
    // allowNull: false
  },
  dateFrom: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  dateTo: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  distance: {
    type: Sequelize.FLOAT,
    allowNull: false,
    unique: false
  },
})

module.exports = Activity
