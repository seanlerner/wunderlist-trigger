module.exports = class {

  constructor() {
    this.trigger            = 'wl'
    this.name               = 'Wunderlist'
    this.lib_dir            = path.join(__dirname, 'lib', '/')
    this.AddItem            = require(this.lib_dir + 'add_item')
    this.Lists              = require(this.lib_dir + 'lists')
    this.Reset              = require(this.lib_dir + 'reset')
    this.GetAccessToken     = require(this.lib_dir + 'get_access_token')
    this.SetupWunderlistApi = require(this.lib_dir + 'setup_wunderlist_api')

    new this.SetupWunderlistApi
  }

  run(trigger_run) {
    let klass

    switch(trigger_run.args) {
      case 'setup':
        klass = 'GetAccessToken'
        break
      case 'reset':
        klass = 'Reset'
        break
      default:
        klass = 'AddItem'
    }

    new this[klass](trigger_run)
  }

}
