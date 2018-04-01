const request        = require('request'),
      GetListsAsJSON = require('./get_lists_as_json'),
      Headers        = require('./headers')

module.exports = class AddTaskToList {

  constructor({ args }) {
    return this.exec(args)
  }

  async exec(args) {
    try {

      await this.set_list_and_body(args)
      await new Promise(this.add_task.bind(this))
      const title = `Added to ${this.list.title} list`,
            body  = this.body

      return { title, body }

    } catch (fail) {
      return { fail }
    }
  }

  async set_list_and_body(args) {
    const args_split = args.split(' '),
          first_arg  = args_split[0],
          lists      = await new GetListsAsJSON,
          regex      = RegExp(first_arg, 'i')

    this.list = lists.find(list => regex.test(list.title))

    if (this.list) {
      this.body = args_split.slice(1).join(' ')
    } else {
      this.list = this.get_inbox(lists)
      this.body = args
    }

  }

  get_inbox(lists) {
    return lists.find(list => list.title == 'inbox')
  }

  add_task(resolve, reject) {
    this.resolve = resolve
    this.reject  = reject

    const url     = 'https://a.wunderlist.com/api/v1/tasks',
          list_id = this.list.id,
          title   = this.body,
          json    = { list_id, title },
          headers = new Headers().get_headers()

    request.post(url, { headers, json }, this.process_response.bind(this))
  }

  process_response(err, resp, body) {
    if (err)
      this.reject(err)
    else if (body.error)
      this.reject(body.error)
    else
      this.resolve(body)
  }

}
