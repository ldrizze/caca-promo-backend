const config = require('../config')
module.exports = class Logger {
  constructor(tag) {
    this.tag = tag
  }

  i (d) {
    if (typeof d === 'object') d = JSON.stringify(d)
    console.info(`[INFO][${this.tag}] ${d}`)
  }

  e (d) {
    if (typeof d === 'object') d = JSON.stringify(d)
    console.error(`[ERROR][${this.tag}] ${d}`.red)
  }

  d (d) {
    if (!config.debug) return
    if (typeof d === 'object') d = JSON.stringify(d)
    console.info(`[DEBUG][${this.tag}] ${d}`.blue)
  }
}
