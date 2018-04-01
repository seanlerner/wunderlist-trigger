const assert            = require('assert'),
      fs                = require('fs'),
      Setup             = require('../src/setup'),
      Settings          = require('../src/settings'),
      WunderlistTrigger = require('../main')

describe('Setup', () => {

  it('new', async () => {

    const settings = new Settings

    if (!fs.existsSync(settings.clip_trigger_settings_file)) {
      console.warn('Skipping this test as no clip trigger settings file exists')
      return
    }

    const setup_result = await new Setup
    assert.equal(setup_result, 'Wunderlist setup complete')

  })

})
