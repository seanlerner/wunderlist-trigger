const clipboardy        = require('clipboardy'),
      WunderlistTrigger = require('../main')

const assert = require('assert'),
      Run    = require('../src/run')

describe('Main / WunderlistTrigger', () => {

  it('has attributes', () => {
    const wunderlist_trigger = new WunderlistTrigger
    assert.equal(wunderlist_trigger.trigger, 'wl')
    assert.equal(wunderlist_trigger.name, 'Wunderlist')
  })

  it('run', () => {
    const wunderlist_trigger = new WunderlistTrigger,
          args               = 'lists'

    wunderlist_trigger.run({ args, resolve })

    function resolve({ title }) {
      const expected_title = 'List titles copied to clipboard'
      assert.equal(title, expected_title)
    }
  })

})
