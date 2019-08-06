const Notifications = (sequalize, type) => {
  return sequalize.define('notifications', {
    id: { type: type.INTEGER, primaryKey: true },
    titulo: { type: type.STRING },
    body: { type: type.STRING },
    user: { type: type.INTEGER },
    uniId: { type: type.STRING },
    link_nombre: { type: type.STRING },
    url: { type: type.STRING }
  })
}

module.exports = Notifications
