const Sequelize = require('sequelize')
require('dotenv').config() // only on for dev and test, remove this line for production
const polizasModel = require('./polizas')
const NotifactionsModel = require('./notifications')
const devicesModel = require('./devices')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false,
    freezeTableName: true
  }
})

const Polizas = polizasModel(sequelize, Sequelize)
const Devices = devicesModel(sequelize, Sequelize)
const Notifications = NotifactionsModel(sequelize, Sequelize)

Polizas.hasMany(Devices, {
  as: 'devices',
  foreignKey: 'user_id',
  constraints: false
})

Devices.belongsTo(Polizas, {
  as: 'User',
  constraints: false,
  foreignKey: 'user_id'
})

module.exports = {
  Polizas,
  Notifications,
  Devices
}
