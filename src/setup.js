const fs       = require('fs'),
      request  = require('request'),
      Settings = require('./settings')

module.exports = class Setup {

  constructor() {
    try {
      this.wunderlist_settings   = new Settings
      this.clip_trigger_settings = this.get_clip_trigger_settings()
      return new Promise(this.request_wunderlist_access_token.bind(this))
    } catch(fail) {
      return { fail }
    }
  }

  get_clip_trigger_settings() {
    if (fs.existsSync(this.wunderlist_settings.clip_trigger_settings_file)) {
      const file_content = fs.readFileSync(this.wunderlist_settings.clip_trigger_settings_file)
      return JSON.parse(file_content)
    } else {
      throw 'Please login to Clip Trigger before setting up Wunderlist'
    }
  }

  request_wunderlist_access_token(resolve, reject) {
    this.resolve = resolve
    this.reject  = reject

    const url                = 'https://clip.smallcity.ca/api/wunderlist/access_token',
          email              = this.clip_trigger_settings.email,
          clip_trigger_token = this.clip_trigger_settings.clip_trigger_token,
          json               = { email, clip_trigger_token }

    request.post(url, { json }, this.process_response.bind(this))
  }

  process_response(err, resp, body) {
    if (err) {
      this.reject(this.get_err_msg(err))
      return
    }

    const current_file_settings = JSON.parse(fs.readFileSync(this.wunderlist_settings.settings_path))
    current_file_settings.client_secret = body
    fs.writeFileSync(this.wunderlist_settings.settings_path, JSON.stringify(current_file_settings))
    this.resolve('Wunderlist setup complete')
  }

  get_err_msg(err) {
    if (err.code == 'ENOTFOUND')
      return "Network unavailable. Cannot setup wunderlist at this time."
    else
      return `Wunderlist setup failed: ${err.code}`
  }

}
