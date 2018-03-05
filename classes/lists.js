module.exports = class {

  constructor(resolve, reject) {
    wunderlist.http.lists.all()
      .done(resolve)
      .fail(reject)
  }

}
