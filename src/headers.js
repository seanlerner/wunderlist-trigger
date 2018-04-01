const fs       = require('fs'),
      Settings = require('./settings')

module.exports = class Headers {

  get_headers() {

    const settings      = new Settings,
          user_settings = JSON.parse(fs.readFileSync(settings.settings_path))

    return {
      'X-Client-ID':    settings.client_id,
      'X-Access-Token': user_settings.client_secret
    }

  }

}
