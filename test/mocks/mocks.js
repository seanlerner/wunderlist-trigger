// General Settings
const nock     = require('nock'),
      Settings = require('../../src/settings'),
      settings = new Settings,
      url      = 'https://a.wunderlist.com'

// Wunderlist headers
const reqheaders = {
  'X-Access-Token': settings.client_secret,
  'X-Client-ID':    settings.client_id
}

// Lists
nock(url, { reqheaders })
  .persist()
  .get('/api/v1/lists')
  .reply(200, require('./lists'))

// Tasks
nock(url, { reqheaders })
  .persist()
  .get('/api/v1/tasks?list_id=344375177')
  .reply(200, require('./tasks'))

// Add item to inbox
const inbox_list_request = {
  list_id: 344080221,
  title:   'call mom'
}

nock(url, { reqheaders })
  .persist()
  .post('/api/v1/tasks', inbox_list_request)
  .reply(200, require('./inbox_list'))

// Add item to shopping list
const shopping_list_request = {
  list_id: 345017110,
  title:   'bananas'
}

nock(url, { reqheaders })
  .persist()
  .post('/api/v1/tasks', shopping_list_request)
  .reply(200, require('./shopping_list'))

// Get wunderlist token from clip trigger server
const clip_trigger_auth_params = {
  email:              process.env.CLIP_TRIGGER_TEST_ACCOUNT_EMAIL,
  clip_trigger_token: process.env.CLIP_TRIGGER_TEST_ACCOUNT_TOKEN
}

nock('https://clip.smallcity.ca')
  .post('/api/wunderlist/access_token', clip_trigger_auth_params)
  .reply(200, process.env.WUNDERLIST_TEST_CLIENT_SECRET)
