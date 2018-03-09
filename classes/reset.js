module.exports = class {

  constructor(resolve, reject) {
    this.resolve = resolve
    this.reject  = reject
    CT.vendor.settings.delete('wunderlist_access_token')
    this.resolve('Wunderlist reset')
  }

}
