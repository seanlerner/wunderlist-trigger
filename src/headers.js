const Settings = require('./settings'),
      settings = new Settings

module.exports = {
  'X-Access-Token': settings.client_secret,
  'X-Client-ID':    settings.client_id
}
