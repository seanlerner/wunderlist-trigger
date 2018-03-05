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
    const list_id = this.inbox(lists).id,
          title   = CT.clipboard.content

    wunderlist.http.tasks.create({ list_id, title })
      .done(this.done.bind(this))
      .fail(this.fail.bind(this))
  }

  inbox(lists) {
    return lists.find(list => list.title == 'inbox')
  }

  done(task_data, status_code) {
    if (status_code == 201)
      this.resolve(`${task_data.title} added to inbox`)
    else
      this.reject('Unhandled outcome in wunderlist done adding task')
  }

  fail(resp, code) {
    this.reject(single_line_str({ resp, code}))
  }

}
