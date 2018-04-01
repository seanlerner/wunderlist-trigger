const fs       = require('fs'),
      request  = require('request'),
      Settings = require('./settings')

module.exports = class Setup {

  constructor() {
    if (this.clip_trigger_settings = this.get_clip_trigger_settings())
      return new Promise(this.request_wunderlist_client_secret.bind(this))
        .then(result => result)
        .catch(result => result)
    else
      return { fail: 'Please login to Clip Trigger before setting up Wunderlist' }
  }

  get_clip_trigger_settings() {
    this.wunderlist_settings = new Settings

    if (fs.existsSync(this.wunderlist_settings.clip_trigger_settings_file)) {
      const file_content = fs.readFileSync(this.wunderlist_settings.clip_trigger_settings_file),
            json         = JSON.parse(file_content)

      if (json.clip_trigger_token)
        return JSON.parse(file_content)
    }
  }

  request_wunderlist_client_secret(resolve, reject) {
    this.resolve = resolve
    this.reject  = reject

    const url                = 'https://clip.smallcity.ca/api/wunderlist/access_token',
          email              = this.clip_trigger_settings.email,
          clip_trigger_token = this.clip_trigger_settings.clip_trigger_token,
          json               = { email, clip_trigger_token }

    request.post(url, { json }, this.process_response.bind(this))
  }

  process_response(err, resp, body) {
    console.log({reject: this.reject})
    console.log({body})

    if (!body)
      this.reject({ fail: 'Please ensure you have authorized Wunderlist on clip.smallcity.ca' })
    else if (body && body.fail)
      this.reject({ fail: body.fail })
    else if (err)
      this.reject({ fail: this.get_err_msg(err) })
    else {
      const current_file_settings = JSON.parse(fs.readFileSync(this.wunderlist_settings.settings_path))
      current_file_settings.client_secret = body


      if (!(process.env.CT_ENV == 'test'))
        fs.writeFileSync(this.wunderlist_settings.settings_path, JSON.stringify(current_file_settings))

      this.resolve('Wunderlist setup complete')
    }
  }

  get_err_msg(err) {
    if (err.code == 'ENOTFOUND')
      return "Network unavailable. Cannot setup wunderlist at this time."
    else
      return `Wunderlist setup failed: ${err.code}`
  }

}
