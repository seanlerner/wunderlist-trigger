module.exports = class {

  constructor() {
    this.trigger   = 'wl'
    this.nice_name = 'Wunderlist'
    this.dir       = path.join(CT.dir.triggers, 'wunderlist-trigger', 'classes', '/')
    this.AddItem   = require(this.dir + 'add_item')
    this.Lists     = require(this.dir + 'lists')
    this.Reset     = require(this.dir + 'reset')
    this.Setup     = require(this.dir + 'setup')
    this.setup_wunderlist_api()
  }

  run(trigger_run) {
    this.resolve = trigger_run.resolve
    this.reject  = trigger_run.reject
    this.command = trigger_run.args

    switch(this.command) {
      case 'setup':
        new this.Setup(this.resolve, this.reject)
        break
      case 'reset':
        new this.Reset(this.resolve, this.reject)
        break
      default:
        if (wunderlist)
          this.run_regular_command()
       else
          this.reject("Please copy 'wl setup' to the clipboard first to get started")
    }

  }

  run_regular_command() {
    switch(this.command) {
      case 'lists':
        new this.Lists(this.resolve, this.reject)
        break
      default:
        new this.AddItem(this.resolve, this.reject)
    }
  }

  setup_wunderlist_api() {
    const
      Wunderlist  = require('wunderlist'),
      accessToken = CT.vendor.settings.get('wunderlist_access_token'),
      clientID    = 'f6256f525bd401b77460',
      options     = { accessToken, clientID }

    if (accessToken)
      global.wunderlist = new Wunderlist(options)
    else
      global.wunderlist = null
  }

}
