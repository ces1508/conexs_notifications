const express = require('express')
const bodyParse = require('body-parser')

const {
  sendNotification,
  getPolizasByDate,
  saveNotifications
} = require('./lib')

require('dotenv').config()
const PORT = 3010

const app = express()
app.use(bodyParse.json())
app.use(bodyParse.urlencoded())

app.get('/', async (req, res) => {
  let today = new Date()
  let nextWeek = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
  try {
    let polizas = await getPolizasByDate(today, nextWeek)
    // let notifications = await saveNotifications(polizas)
    // console.log(notifications)
    let data = {}
    // let notification = await sendNotification('test', data)
    // console.log(notification)
    res.send(polizas)
  } catch (e) {
    console.log('errro', e)
    res.send(e)
  }
})

app.listen(PORT, err => {
  if (err) {
    console.log('error ', err.stack)
  }
  console.log('server running')
})
