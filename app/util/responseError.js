module.exports = class ResponseError {
  constructor (code, message, details) {
    this.code = code
    this.message = message
    this.details = details
  }

  static generalError() {
    return new ResponseError('GNRL', 'general error')
  }

  static invalidParams() {
    return new ResponseError('INVLPRMS', 'invalid params')
  }
}