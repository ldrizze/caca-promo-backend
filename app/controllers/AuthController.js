const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const Session = require('../util/session')
const validator = require('validator')
const ResponseError = require('../util/responseError')
const Logger = require('../util/logger')
const log = new Logger('AuthController')
const { Op } = require("sequelize")

module.exports = class AuthController {
  async auth (req, res, next) {
    try {
      if (this._validateInput(req.body)) {
        const usuario = await Usuario.instance.scope('withPassword').findOne({
          where: {
            [Op.or]: [
              {
                email: req.body.usuario
              },
              {
                usuario: req.body.usuario
              }
            ]
          }
        })
        if (usuario) {
          const compare = bcrypt.compareSync(req.body.senha, usuario.senha)
          if (compare) {
            res.json({ token: Session.make(usuario.id) })
          } else {
            res.status(400).json(ResponseError.invalidParams())
          }
        } else {
          res.status(400).json(ResponseError.invalidParams())
        }
      } else {
        res.status(400).json(ResponseError.invalidParams())
      }
    } catch (error) {
      log.e(error.toString())
      res.status(500).json(ResponseError.generalError())
    } finally {
      next()
    }
  }

  async me(req, res, next) {
    res.json(req.session.user)
    next()
  }

  _validateInput(inputs) {
    return !!inputs.senha
    && !!inputs.usuario
    && validator.isByteLength(inputs.senha, {min: 6})
  }
}