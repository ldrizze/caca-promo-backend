const Logger = require('../util/logger')
const log = new Logger('UsuarioController')
const validator = require('validator')
const ResponseError = require('../util/responseError')
const Restaurante = require('../models/Restaurante')
const Promocao = require('../models/Promocao')

module.exports = class RestauranteController {
  async getAll (req, res, next) {
    try {
      const restaurantes = await Restaurante.instance.findAll({
        orderBy: 'nome'
      })
      res.json(restaurantes)
    } catch (error) {
      res.status(500).json(ResponseError.interal(error))
    } finally {
      next()
    }
  }

  async get (req, res, next) {
    if (!validator.isInt(req.params.restauranteId)) {
      res.status(400).json(ResponseError.invalidParams())
    } else {
      const restauranteId = parseInt(req.params.restauranteId, 10)
      const restaurante = await Restaurante.instance.findByPk(restauranteId)

      if (restaurante) {
        res.json(restaurante)
      } else {
        res.status(404).json(ResponseError.notFound({restauranteId: req.params.restauranteId}))
      }
    }
    next()
  }

  async create (req, res, next) {
    try {
      if (this._validateCreateInputs(req.body)) {
        const data = { ...req.body, data_de_registro: new Date() }
        await Restaurante.instance.create(data)
        res.status(201).json(data)
      } else {
        res.status(400).json(ResponseError.invalidParams())
      }
    } catch (error) {
      log.e(error.toString())
      res.status(500).json(ResponseError.interal(error))
    } finally {
      next()
    }
  }

  async update (req, res, next) {
    try {
      if (this._validateCreateInputs(req.body)) {
        const exists = await Restaurante.instance.findByPk(req.params.restauranteId)
        if (!exists || req.params.restauranteId !== exists.id) {
          res.status(404).json(new ResponseError('RSTDNTEXTS', `restaurante doesn't exists`))
        } else {
          const data = { ...req.body, id: exists.id }
          await Restaurante.instance.update(data)
          res.status(200).json(data)
        }
      } else {
        res.status(400).json(ResponseError.invalidParams())
      }
    } catch (error) {
      log.e(error.toString())
      res.status(400).json(ResponseError.invalidParams(error))
    } finally {
      next()
    }
  }

  async delete (req, res, next) {
    try {
      if (!req.params.restauranteId) {
        res.status(400).json(ResponseError.invalidParams())
      } else {
        const restaurante = await Restaurante.findByPk(req.params.userId)
        if (!restaurante) {
          res.status(404).json(ResponseError.notFound())
        } else {
          await restaurante.delete()
          res.status(200).send()
        }
      }
    } catch(error) {
      log.e(error)
      res.status(500).json(ResponseError.interal(error))
    } finally {
      next()
    }
  }

  _validateCreateInputs (inputs) {
    return !validator.isEmpty(inputs.nome) &&
    !validator.isEmpty(inputs.endereco) &&
    !validator.isEmpty(inputs.numero) &&
    !validator.isEmpty(inputs.bairro) &&
    !validator.isEmpty(inputs.cep)
  }

  // ==================
  // PROMOÇÕES
  // ==================
  async promoCreate (req, res, next) {
    try {
      const restaurantes = await req.session.user
      const assoc = await restaurantes.getUsuariosRestaurante()
      const restaurante = await assoc.getRestaurante()

      if (restaurante.id != req.params.restauranteId) {
        res.status(403).json(new ResponseError('PERMDNY', 'permission denied'))
      } else {
        const data = {...req.body, id_restaurante: req.params.restauranteId , data_de_registro: new Date()}
        const promocao = await Promocao.instance.create(data)
        res.json(promocao)
      }
    } catch (error) {
      log.e(error)
      res.status(500).json(ResponseError.interal(error))
    } finally {
      next()
    }
  }
}
