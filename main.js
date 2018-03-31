const Run = require('./src/run')

module.exports = class WunderlistTrigger {

  constructor() {
    this.trigger = 'wl'
    this.name    = 'Wunderlist'
  }

  run(run) {
    new Run(run)
  }

}
