const jwt = require('jsonwebtoken')
const config = require('../config')
const Usuario = require('../models/Usuario')
const ResponseError = require('../util/responseError')

module.exports = class Session {
  constructor (token) {
    this.data = jwt.verify(token, config.secret)
    Usuario.instance.findByPk(this.data.userid).then(user => this.data = user)
  }

  static make (userid) {
    return jwt.sign({ userid }, config.secret, { expiresIn: '30d' });
  }

  static isAuth (req, res, next) {
    if (!req.session) {
      res.status(401).json(new ResponseError('INVLDAUTH', 'invalid authentication'))
    } else {
      next()
    }
  }
}