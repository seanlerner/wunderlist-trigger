const assert        = require('assert'),
      AddTaskToList = require('../src/add_task_to_list')

describe('AddTaskToList', () => {

  it('inbox', async () => {
    const { title, body } = await new AddTaskToList({ args: 'call mom' }),
          expected_title  = 'Added to inbox list',
          expected_body   = 'call mom'

    assert.equal(title, expected_title)
    assert.equal(body,  expected_body)
  })

  it('custom list', async () => {
    const { title, body } = await new AddTaskToList({ args: 'shopping bananas' }),
          expected_title  = 'Added to Shopping list',
          expected_body   = 'bananas'

    assert.equal(title, expected_title)
    assert.equal(body,  expected_body)
  })

})
