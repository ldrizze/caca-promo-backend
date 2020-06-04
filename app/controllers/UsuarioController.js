const Logger = require('../util/logger')
const log = new Logger('UsuarioController')
const validator = require('validator')
const ResponseError = require('../util/responseError')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')

module.exports = class UsuarioController {
  async create (req, res, next) {
    try {
      if (this._validateCreateInputs(req.body)) {
        const exists = await Usuario.instance.count({email: req.email })
        if (exists > 0) {
          res.status(400).json(new ResponseError('USREXTS', 'user exists'))
          next()
        } else {
          const data = { ...req.body, data_de_registro: new Date(), tipo_de_usuario: 'U' }
          data.senha = bcrypt.hashSync(data.senha, 8)
          await Usuario.instance.create(data)
          res.status(201).json(data)
          next()
        }
      } else {
        return res.status(400).json(new ResponseError('USRINPT', 'invalid input'))
      }
    } catch (error) {
      log.e(error.toString())
      return res.status(400).json(new ResponseError('USRPRMS', 'missing params'))
    }
  }

  async update (req, res) {

  }

  async delete (req, res) {

  }

  _validateCreateInputs (inputs) {
    return !validator.isEmpty(inputs.email) &&
    validator.isEmail(inputs.email) &&
    !validator.isEmpty(inputs.email) &&
    !validator.isEmpty(inputs.nome) &&
    !validator.isEmpty(inputs.email) &&
    !validator.isEmpty(inputs.senha) &&
    validator.isByteLength(inputs.senha, {min: 6}) &&
    !validator.isEmpty(inputs.endereco) &&
    !validator.isEmpty(inputs.numero) &&
    !validator.isEmpty(inputs.bairro) &&
    !validator.isEmpty(inputs.cep)
  }
}
