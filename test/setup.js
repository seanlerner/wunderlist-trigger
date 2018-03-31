const assert   = require('assert'),
      fs       = require('fs'),
      Setup    = require('../src/setup'),
      Settings = require('../src/settings')

describe('Setup', () => {

  it('gets wunderlist access token from clip trigger server', async () => {

    const settings = new Settings

    if (!fs.existsSync(settings.clip_trigger_settings_file)) {
      console.warn('Skipping this test as no clip trigger settings file exists')
      return
    }

    const settings_path = process.env.HOME + '/Library/Application Support/wunderlist-trigger/settings-test.json'

    if (fs.existsSync(settings_path))
      fs.unlinkSync(settings_path)

    const msg          = await new Setup
    const new_settings = JSON.parse(fs.readFileSync(settings_path))

    assert.equal(new_settings.client_secret, process.env.WUNDERLIST_TEST_CLIENT_SECRET)
    assert.equal(msg, 'Wunderlist setup complete')

  })

})
