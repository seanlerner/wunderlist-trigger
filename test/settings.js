const assert   = require('assert'),
      fs       = require('fs'),
      Settings = require('../src/settings')

describe('Settings', () => {

  it('creates settings file if none exists', () => {
    const settings_path = process.env.HOME + '/Library/Application Support/wunderlist-trigger/settings-test.json'

    if (fs.existsSync(settings_path))
      fs.unlinkSync(settings_path)

    const settings = new Settings

    assert(fs.existsSync(settings_path))
  })

  it('sets default settings', () => {
    const settings = new Settings
    assert.equal(settings.client_id, 'f6256f525bd401b77460')
    assert.equal(settings.settings_file, 'settings-test.json')
  })

  it('sets enviornment settings', () => {
    const settings = new Settings
    assert.equal(settings.client_secret, process.env.WUNDERLIST_TEST_CLIENT_SECRET)
  })

})
