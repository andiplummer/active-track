const Sequelize = require('sequelize')
const db = require('../db')

const Avatar = db.define('avatar', {
  src: {
    type: Sequelize.BLOB,
    allowNull: true,
    unique: false
  },
})

module.exports = Avatar