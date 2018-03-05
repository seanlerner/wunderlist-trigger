module.exports = class {

  constructor(resolve, reject) {
    this.resolve = resolve
    this.reject  = reject
    this.get_lists_and_add_item()
  }

  get_lists_and_add_item(){
    new CT.triggers.wl.Lists(this.add_item.bind(this), this.reject)
  }

  add_item(lists) {
    this.lists = lists
    this.set_desired_list()

    const list_id = this.list.id,
          title   = this.item_title

    wunderlist.http.tasks.create({ list_id, title })
      .done(this.done.bind(this))
      .fail(this.fail.bind(this))
  }

  set_desired_list() {
    const first_word = CT.clipboard.content.split(' ')[0]

    this.first_word_regex = new RegExp(first_word, 'i')
    this.list             = this.lists.find(this.is_desired_list.bind(this))

    if (this.list)
      this.item_title = this.all_but_first_word()
    else
      this.set_to_inbox()
  }

  is_desired_list(list) {
    return this.first_word_regex.test(list.title)
  }

  all_but_first_word() {
    const content = CT.clipboard.content
    return content.substr(content.indexOf(' ') + 1)
  }

  set_to_inbox() {
    this.list       = this.lists.find(this.is_inbox)
    this.item_title = CT.clipboard.content
  }

  is_inbox(list) {
    return list.title == 'inbox'
  }

  done(task_data, status_code) {
    if (status_code == 201)
      this.resolve(`${task_data.title} added to ${this.list.title}`)
    else
      this.done_but_fail(task_data, status_code)
  }

  done_but_fail(task_data, status_code) {
    const reason = `Unhandled Wunderlist done task when adding ${task_data.title} to ${this.list.title}. Status code: ${status_code}`
    new ErrorHandler({ reason, filename: __filename })
    this.reject(reason)

  }

  fail(resp, code) {
    this.reject(single_line_str({ resp, code }))
  }

}
