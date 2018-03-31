const clipboardy     = require('clipboardy'),
      GetListsAsJSON = require('./get_lists_as_json'),
      GetTasksAsJSON = require('./get_tasks_as_json')

module.exports = class WriteListTasksToClipboard {

  constructor({ args }) {
    const list_title = args.replace('tasks ', '')
    return this.exec(list_title)
  }

  async exec(list_title) {
    const list = await this.get_list(list_title)

    if (!list)
      return { fail: `${list_title} does not exist` }

    const title = `${list.title} items copied to clipboard`,
          body  = await this.get_tasks(list)

    clipboardy.writeSync(body)

    return { title, body }
  }

  async get_list(list_title) {
    const lists = await new GetListsAsJSON,
          regex = RegExp(list_title, 'i')

    return lists.find(list => regex.test(list.title))
  }

  async get_tasks(list) {
    const tasks = await new GetTasksAsJSON({ list })
    return tasks.map(task => task.title).join('\n')
  }

}
