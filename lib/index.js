const OneSignal = require('onesignal-node')
const { Notifications, Polizas, Devices } = require('../models')
const { Op } = require('sequelize')

require('dotenv').config()

const appId = process.env.APPID
const token = process.env.OSTOKEN
const userAuthKey = process.env.USER_AUTH_KEY

const osClient = new OneSignal.Client({
  userAuthKey,
  app: { appAuthKey: token, appId }
})

const sendNotification = (title, data) => {
  let notification = new OneSignal.Notification({
    contents: {
      en: title,
      es: title
    }
  })
  notification.postBody['data'] = data
  notification.postBody['included_segments'] = ['Subscribed Users']
  return new Promise((resolve, reject) => {
    osClient.sendNotification(notification, (err, response, data) => {
      if (err) {
        return reject(new Error(err))
      }
      resolve(data)
    })
  })
}

const getPolizasByDate = async (starDate, endDate) => {
  try {
    let polizas = await Polizas.findAll({
      where: {
        fecha_final: { [Op.between]: [starDate, endDate] },
        estado: 'ACTIVO',
        formato: { [Op.ne]: 'SINIESTRO' },
        tipo_poliza: { [Op.ne]: 'CUMPLIMIENTO' }
      },
      include: [{
        model: Devices,
        as: 'devices',
        where: { kind: 'onesignal' }
      }],
      attributes: ['formato', 'tipo_poliza', 'cedula_nit', 'fecha_final', 'poliza', 'fecha_inicial'],
      limit: 20
    }).map(item => item.get({ plain: true }))
    return polizas
  } catch (e) {
    console.log(e)
    return new Error(e)
  }
}

const saveNotifications = async (data) => {
  try {
    let bulk = data.map(item => ({
      titulo: 'te informamos que en una semana se vence tu poliza',
      message: `hola ${item.titular} tu poliza ${item.poliza} correspondiente al servicio de ${item.tipo_poliza} vence el ${item.fecha_final}`,
      user: item.cedula_nit
    }))
    let notifications = await Notifications.bulkCreate(bulk)
    return notifications.findAll().map(item => item.get({ plain: true }))
  } catch (e) {
    return new Error(e)
  }
}

module.exports = {
  sendNotification,
  getPolizasByDate,
  saveNotifications
}
