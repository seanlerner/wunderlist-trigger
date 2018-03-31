const assert     = require('assert'),
      clipboardy = require('clipboardy'),
      Run        = require('../src/run')

describe('Run', () => {

  it('tasks from list', done => {
    const args = 'tasks List-With-Items'

    new Run({ args, resolve })

    function resolve({ title, body }) {
      const expected_title              = 'List-With-Items items copied to clipboard',
            expected_body_and_clipboard = 'item a\nitem b\nitem c'

      assert.equal(title,                 expected_title)
      assert.equal(body,                  expected_body_and_clipboard)
      assert.equal(clipboardy.readSync(), expected_body_and_clipboard)
      done()
    }

  })

  it('no tasks from nonexistant title', done => {
    const args = 'tasks Nonexistant-List'

    new Run({ args, reject })

    function reject({ title }) {
      assert.equal(title, 'Nonexistant-List does not exist')
      done()
    }

  })

  it('list titles', done => {
    const args = 'lists'

    new Run({ args, resolve })

    function resolve({ title }) {
      assert.equal(title, 'List titles copied to clipboard')
      done()
    }

  })

  it('adds task to inbox', done => {
    const args = 'call mom'

    new Run({ args, resolve })

    function resolve({ title, body }) {
      assert.equal(title, 'Added to inbox list')
      assert.equal(body,  'call mom')
      done()
    }

  })

  it('adds task to custom list', done => {
    const args = 'shop bananas'

    new Run({ args, resolve })

    function resolve({ title, body }) {
      assert.equal(title, 'Added to Shopping list')
      assert.equal(body,  'bananas')
      done()
    }

  })

})
