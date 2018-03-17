module.exports = class {

  constructor(run) {
    this.run = run
    this.get_access_token()
  }

  get_access_token() {
    const
      url  = CT.config.clip_trigger_server + '/api/wunderlist/access_token',
      json = CT.config.login_credentials

    CT.vendor.request.post(url, { json }, this.setup_or_fail.bind(this))
  }

  setup_or_fail(err, resp, body) {
    if (this.resp_ok(resp) && this.body_ok(body))
      this.success(body)
    else
      this.fail({ err, resp, body })
  }

  resp_ok(resp) {
    return resp && resp.statusCode == 200
  }

  body_ok(body) {
    return body && body != '' && body != 'fail'
  }

  success(body) {
    CT.vendor.settings.set('wunderlist_access_token', body)
    new CT.triggers.wl.SetupWunderlistApi
    this.run.resolve('Setup successful')
  }

  fail(fail_obj) {
    fail_obj.reason   = 'Wunderlist setup failed'
    fail_obj.filename = __filename
    new ErrorHandler(fail_obj)
    this.run.reject('Setup failed. See error log for details.')
  }

}
