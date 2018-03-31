const request = require('request'),
      headers = require('./headers')

module.exports = class Lists {

  constructor() {
    return new Promise(this.try_catch.bind(this))
  }

  try_catch(resolve, reject) {
    try {
      this.request(resolve)
    } catch (err) {
      reject(err)
    }
  }

  request(resolve) {
    this.resolve = resolve
    const url    = 'https://a.wunderlist.com/api/v1/lists'

    request({ headers, url }, this.process_response.bind(this))
  }

  process_response(err, resp, body) {
    if (err)
      throw err
    else
      this.process_body(body)
  }

  process_body(body) {
    const json = JSON.parse(body)

    if (json.invalid_request || json.error)
      throw json
    else
      this.resolve(json)
  }

}
