module.exports = class {

  constructor(run) {

    global.wunderlist = null

    const current_wunderlist_access_token = CT.vendor.settings.get('wunderlist_access_token')

    if (current_wunderlist_access_token) {
      CT.vendor.settings.delete('wunderlist_access_token')
      run.resolve('Wunderlist reset')
    } else {
      run.reject('Reset failed: no wunderlist access token exists to delete')
    }

  }

}
