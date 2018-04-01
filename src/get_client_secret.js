const Settings = require('./settings')

module.exports = class GetClientSecret {

  get_client_secret() {
    const settings = new Settings
    if (settings.client_secret && settings.client_secret != 'fail')
      return  settings.client_secret
  }

}
