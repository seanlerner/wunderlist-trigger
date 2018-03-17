module.exports = class {

  constructor(run) {
    if (!wunderlist) {
      run.reject("Please copy 'wl setup' to the Clipboard to get started.")
      return
    }

    this.run = run
    this.get_lists_and_add_item()
  }

  get_lists_and_add_item() {
    new Promise(new CT.triggers.wl.Lists().get_lists)
      .then(this.add_item.bind(this))
      .catch(this.fail.bind(this))
  }

  add_item(lists) {
    this.lists = lists

    let list = this.get_desired_list_from_first_arg(lists)
    let title

    if (list) {
      title = this.all_but_first_arg()
    } else {
      list  = this.get_inbox_list(lists)
      title = this.run.args
    }

    wunderlist.http.tasks.create({ list_id: list.id, title })
      .done(this.done.bind(this))
      .fail(this.fail.bind(this))

  }

  get_desired_list_from_first_arg(lists) {
    const
      first_arg       = this.run.args.split(' ')[0],
      first_arg_regex = new RegExp(first_arg, 'i')

    return lists.find(list => first_arg_regex.test(list.title))
  }

  all_but_first_arg() {
    const args = this.run.args
    return args.substr(args.indexOf(' ') + 1)
  }

  get_inbox_list(lists) {
    return this.lists.find(this.is_inbox)
  }

  is_inbox(list) {
    return list.title == 'inbox'
  }

  done(task_data, status_code) {
    if (status_code != 201) {
      this.done_but_fail(task_data, status_code)
      return
    }

    this.run.resolve({
      title:    task_data.title,
      subtitle: 'added to',
      body:     this.get_list_title_by_id(task_data.list_id)
    })
  }

  get_list_title_by_id(list_id) {
    return this.lists.find(list => list.id == list_id).title
  }

  done_but_fail(task_data, status_code) {
    const
      reason   = `Unhandled Wunderlist done task when adding ${task_data.title} to list_id: ${task_data.list_id}. Status code: ${status_code}`,
      filename = __filename

    new ErrorHandler({ reason, filename })

    this.run.reject(reason)
  }

  fail(resp, code) {
    this.run.reject(single_line_str({ resp, code }))
  }

}
