const assert         = require('assert'),
      GetListsAsJSON = require('../src/get_lists_as_json')

describe('GetListsAsJSON', () => {

  it('new', async () => {
    const actual_lists         = await new GetListsAsJSON,
          actual_list_titles   = actual_lists.map(list => list.title).sort(),
          expected_lists       = require('./mocks/lists'),
          expected_list_titles = expected_lists.map(list => list.title).sort()

    assert.deepEqual(actual_list_titles, expected_list_titles)
  })

})
