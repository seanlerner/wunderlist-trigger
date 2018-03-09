module.exports = class {

  constructor(resolve, reject) {
    this.resolve = resolve
    this.reject  = reject
    this.get_access_token()
  }

  get_access_token() {
    CT.vendor.request.post(
      CT.config.clip_trigger_server + '/api/wunderlist/access_token',
      { json: CT.config.login_credentials },
      this.setup_or_fail.bind(this)
    )
  }

  setup_or_fail(err, resp, body) {
    if (body && body != '' && body != 'fail')
      this.setup(body)
    else if (body)
      this.reject('Setup failed')
    else
      this.reject('Error setting up Wunderlist')
  }

  setup (body) {
    CT.vendor.settings.set('wunderlist_access_token', body)
    this.resolve('Setup successful')
  }

}
