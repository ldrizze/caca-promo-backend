const jwt = require('jsonwebtoken')
const config = require('../config')
const Usuario = require('../models/Usuario')
const ResponseError = require('../util/responseError')

module.exports = class Session {
  constructor (token) {
    this.data = jwt.verify(token, config.secret)
  }

  async fillUser() {
    this.user = await Usuario.instance.findByPk(this.data.userid)
  }

  static make (userid) {
    return jwt.sign({ userid }, config.secret, { expiresIn: '30d' });
  }

  static isAuth (role) {
    return (req, res, next) => {
      if (
          !req.session ||
          (
            req.session &&
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
}