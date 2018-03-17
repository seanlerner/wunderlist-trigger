module.exports = class {

  get_lists(resolve, reject) {
    wunderlist.http.lists.all()
      .done(resolve)
      .fail(reject)
  }

}
