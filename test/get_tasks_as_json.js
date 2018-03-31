const assert         = require('assert'),
      GetTasksAsJSON = require('../src/get_tasks_as_json')

describe('GetTasksAsJSON', () => {

  it('new', async () => {
    const lists           = require('./mocks/lists'),
          list_with_items = lists.find(list => list.title == 'List-With-Items'),
          actual          = await new GetTasksAsJSON({ list: list_with_items }),
          expected        = require('./mocks/tasks')

    assert.deepEqual(actual, expected)
  })

})
