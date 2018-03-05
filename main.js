module.exports = class {

  constructor() {
    this.trigger = 'wl'
    this.dir     = path.join(CT.dir.triggers, 'wunderlist-trigger', 'classes', '/')

    if (this.access_token)
      this.setup()
  }

  run(resolve, reject) {
    this.resolve = resolve
    this.reject  = reject
    this.command = CT.clipboard.content.split(' ')[0]

    if (this.is_setup)
      this.run_regular_command()
    else if (this.command == 'setup')
      this.get_access_token_from_clip_trigger_server()
    else
      reject("Please run 'wl setup' first")
  }

  run_regular_command() {
    if (this.command == 'lists')
      new this.Lists(this.resolve, this.reject)
    else
      new this.AddItem(this.resolve, this.reject)
  }

  setup() {
    const
      Wunderlist  = require('wunderlist'),
      accessToken = this.access_token,
      clientID    = 'f6256f525bd401b77460',
      options     = { accessToken, clientID }

    global.wunderlist = new Wunderlist(options)

    this.Lists    = require(this.dir + 'lists')
    this.AddItem  = require(this.dir + 'add_item')
    this.is_setup = true
  }

  get_access_token_from_clip_trigger_server() {
    const GetAccessToken = require(this.dir + 'get_access_token')
    new GetAccessToken(this.resolve, this.reject)
    this.setup()
  }

  get access_token() {
    return CT.vendor.settings.get('wunderlist_access_token')
  }

}
