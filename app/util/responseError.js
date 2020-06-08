module.exports = class ResponseError {
  constructor (code, message, details) {
    this.code = code
    this.message = message
    this.details = details instanceof Error ? details.toString() : details
  }

  static generalError(details) {
    return new ResponseError('GNRL', 'general error', details)
  }

  static invalidParams(details) {
    return new ResponseError('INVLPRMS', 'invalid params', details)
  }

  static notFound(details) {
    return new ResponseError('NTFND', 'not found', details)
  }

  static internal(details) {
    return new ResponseError('INTSVERR', 'internal server error', details)
  }
}