module.exports = class ResponseError {
  constructor (code, message) {
    this.code = code
    this.message = message
  }
}