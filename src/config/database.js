const Sequelize = require('sequelize')

const sequelize = new Sequelize('test', 'root', 'root', {
    dialect: 'sqlite',
    storage: 'database.sqlite'
  })


module.exports = sequelize;