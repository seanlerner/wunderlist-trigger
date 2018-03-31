const assert                     = require('assert'),
      clipboardy                 = require('clipboardy'),
      WriteListTasksToClipboard  = require('../src/write_list_tasks_to_clipboard'),
      original_clipboard_content = clipboardy.readSync()

before(() => { clipboardy.writeSync('') })
after (() => { clipboardy.writeSync(original_clipboard_content) })

describe('WriteListTasksToClipboard', () => {

  const expected_clipboard_content = 'item a\nitem b\nitem c',
        expected_title             = 'List-With-Items items copied to clipboard'

  it('existing list -- full title', async () => {
    const args      = 'tasks List-With-Items',
          { title } = await new WriteListTasksToClipboard({ args })

    assert.equal(title, expected_title )
    assert.equal(clipboardy.readSync(), expected_clipboard_content)
  })

  it('existing list -- partial title', async () => {
    const args      = 'tasks With',
          { title } = await new WriteListTasksToClipboard({ args })

    assert.equal(title, expected_title )
    assert.equal(clipboardy.readSync(), expected_clipboard_content)
  })

  it('existing list -- lowercase title', async () => {
    const args      = 'tasks list-with-items',
          { title } = await new WriteListTasksToClipboard({ args })

    assert.equal(title, expected_title )
    assert.equal(clipboardy.readSync(), expected_clipboard_content)
  })

  it('nonexistant list', async () => {
    const args     = 'tasks Nonexistant-List',
          { fail } = await new WriteListTasksToClipboard({ args })

    assert.equal(fail, 'Nonexistant-List does not exist')
  })

})
