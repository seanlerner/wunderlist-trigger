module.exports = class {

  constructor() {
    this.trigger            = 'wl'
    this.name               = 'Wunderlist'
    this.classes_dir        = path.join(__dirname, 'classes', '/')
    this.AddItem            = require(this.classes_dir + 'add_item')
    this.Lists              = require(this.classes_dir + 'lists')
    this.Reset              = require(this.classes_dir + 'reset')
    this.GetAccessToken     = require(this.classes_dir + 'get_access_token')
    this.SetupWunderlistApi = require(this.classes_dir + 'setup_wunderlist_api')

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
