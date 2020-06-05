const Logger = require('../util/logger')
const log = new Logger('UsuarioController')
const validator = require('validator')
const ResponseError = require('../util/responseError')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')

module.exports = class UsuarioController {
  async get (req, res, next) {
    if (!validator.isInt(req.params.userId)) {
      res.status(400).json(new ResponseError('INVLDUSERID', 'invalid userid'))
    } else {
      const userId = parseInt(req.params.userId, 10)
      const user = await Usuario.instance.findByPk(userId)

      if (user) {
        res.json(user)
      } else {
        res.status(404).json(new ResponseError('USRNOTFND', 'user not found'))
      }
    }
    next()
  }
  
  async create (req, res, next) {
    try {
      if (this._validateCreateInputs(req.body, false)) {
        const exists = await Usuario.instance.count({email: req.email })
        if (exists > 0) {
          res.status(400).json(new ResponseError('USREXTS', 'user exists'))
        } else {
          const data = { ...req.body, data_de_registro: new Date(), tipo_de_usuario: 'U' }
          data.senha = bcrypt.hashSync(data.senha, 8)
          await Usuario.instance.create(data)
          res.status(201).json(data)
        }
      } else {
        res.status(400).json(new ResponseError('USRINPT', 'invalid input'))
      }
    } catch (error) {
      log.e(error.toString())
      res.status(400).json(new ResponseError('USRPRMS', 'missing params'))
    } finally {
      next()
    }
  }

  async update (req, res, next) {
    try {
      if (this._validateCreateInputs(req.body)) {
        const exists = await Usuario.instance.findByPk(req.params.userId)
        if (!exists) {
          res.status(400).json(new ResponseError('USRDNTEXTS', `user doesn't exists`))
        } else {
          const data = { ...req.body, id: exists.id, data_de_registro: new Date(), tipo_de_usuario: 'U' }
          if (data.senha) {
            data.senha = bcrypt.hashSync(data.senha, 8)
          }
          await Usuario.instance.update(data)
          res.status(200).json(data)
        }
      } else {
        res.status(400).json(new ResponseError('USRINPT', 'invalid input'))
      }
    } catch (error) {
      log.e(error.toString())
      res.status(400).json(new ResponseError('USRPRMS', 'missing params'))
    } finally {
      next()
    }
  }

  async delete (req, res, next) {
    try {
      if (!req.params.userId) {
        res.status(400).json(new ResponseError('USRWRID', `wrong userId ${req.params.userId}`))
      } else {
        const usuario = await Usuario.findOne(req.params.userId)
        await usuario.delete()
        res.status(200).send()
      }
    } catch(error) {
      log.e(error)
      res.status(500).json(new ResponseError('USRDEL', 'user delete error', error))
    } finally {
      next()
    }
  }

  _validateCreateInputs (inputs, update) {
    return !validator.isEmpty(inputs.email) &&
    validator.isEmail(inputs.email) &&
    !validator.isEmpty(inputs.email) &&
    !validator.isEmpty(inputs.nome) &&
    !validator.isEmpty(inputs.email) &&
    (!update || (!validator.isEmpty(inputs.senha) &&
    validator.isByteLength(inputs.senha, {min: 6}))) &&
    !validator.isEmpty(inputs.endereco) &&
    !validator.isEmpty(inputs.numero) &&
    !validator.isEmpty(inputs.bairro) &&
    !validator.isEmpty(inputs.cep)
  }
}
