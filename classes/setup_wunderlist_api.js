module.exports = class {

  constructor() {

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
