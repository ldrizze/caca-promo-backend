const jwt = require('jsonwebtoken')
const config = require('../config')
const Usuario = require('../models/Usuario')
const ResponseError = require('../util/responseError')

module.exports = class Session {
  constructor (token) {
    this.data = jwt.verify(token, config.secret)
    Usuario.instance.findByPk(this.data.userid).then(user => this.user = user)
  }

  static make (userid) {
    return jwt.sign({ userid }, config.secret, { expiresIn: '30d' });
  }

  static isAuth (role) {
    (req, res, next) => {
      if (
          !req.session ||
          (
            role &&
            role.indexOf(req.session.user.tipo_de_usuario) === -1
          )
      ) {
        res.status(401).json(new ResponseError('INVLDAUTH', 'invalid authentication'))
      } else {
        next()
      }
    }
  }

  static isRole() {
    return (req, res, next) => {

    }
  }
}