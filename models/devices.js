const Device = (sequelize, type) => {
  return sequelize.define('gcm', {
    uuid: { type: type.TEXT },
    regId: { type: type.TEXT, primaryKey: true },
    user_id: { type: type.TEXT },
    kind: {
      type: type.TEXT,
      defaultValue: 'onesignal'
    }
  })
}

module.exports = Device
