const assert                     = require('assert'),
      clipboardy                 = require('clipboardy'),
      WriteListsToClipboard      = require('../src/write_lists_to_clipboard'),
      original_clipboard_content = clipboardy.readSync()

before(() => { clipboardy.writeSync('') })
after (() => { clipboardy.writeSync(original_clipboard_content) })

describe('WriteListsToClipboard', () => {

  it('new', async () => {
    const { title, body }            = await new WriteListsToClipboard,
          expected_title             = 'List titles copied to clipboard',
          expected_body              = 'inbox, List-With-Items, Shopping',
          actual_clipboard_content   = clipboardy.readSync(),
          expected_clipboard_content = 'inbox\nList-With-Items\nShopping'

    assert.equal(title, expected_title)
    assert.equal(body, expected_body)
    assert.equal(actual_clipboard_content, expected_clipboard_content)
  })

})
