const Sequelize = require('sequelize')
const db = require('../db')

const ActivityType = db.define('activityType', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
})

module.exports = ActivityType