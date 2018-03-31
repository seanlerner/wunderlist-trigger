const clipboardy     = require('clipboardy'),
      GetListsAsJSON = require('./get_lists_as_json')

module.exports = class WriteListsToClipboard {

  constructor() {
    return this.exec()
  }

  async exec() {
    const lists   = await new GetListsAsJSON,
          title   = 'List titles copied to clipboard',
          titles  = lists.map(list => list.title),
          body    = titles.join(', '),
          content = titles.join('\n')

    clipboardy.writeSync(content)

    return { title, body }
  }

}
