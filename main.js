const GetClientSecret = require('./src/get_client_secret'),
      Run             = require('./src/run'),
      Settings        = require('./src/settings'),
      Setup           = require('./src/setup')

module.exports = class WunderlistTrigger {

  constructor() {
    this.trigger  = 'wl'
    this.name     = 'Wunderlist'
    this.client_secret = new GetClientSecret().get_client_secret()
  }

  run(run) {

    if (run.args == 'setup')
      this.setup(run)
    else if (this.client_secret)
      new Run(run)
    else
      run.reject("Please run 'wl setup' first to get started")

  }

  async setup(run) {
    const result = await new Setup

    if (result.fail)
      run.reject({ title: 'Wunderlist setup failed', body: result.fail })
    else {
      this.client_secret = new GetClientSecret().get_client_secret()
      run.resolve(result)
    }
  }

}
