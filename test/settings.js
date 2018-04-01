const assert   = require('assert'),
      fs       = require('fs'),
      Settings = require('../src/settings')

describe('Settings', () => {

  it('sets default settings', () => {
    const settings = new Settings
    assert.equal(settings.client_id, 'f6256f525bd401b77460')
  })

  it('sets enviornment settings', () => {
    const settings = new Settings
    assert.equal(settings.settings_file, 'wunderlist-trigger.json')
  })

  it('sets user settings', () => {
    const settings = new Settings
    assert.equal(settings.client_secret, process.env.WUNDERLIST_TEST_CLIENT_SECRET)
  })

})
