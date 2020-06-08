const ResponseError = require('../util/responseError')
const Logger = require('../util/logger')
const log = new Logger('TipoComidasController')
const TipoComida = require('../models/TipoComida')

module.exports = class TipoComidasController {
  async getAll (req, res, next) {
    try {
      const tipos = await TipoComida.instance.findAll({
        orderBy: ['nome']
      })
      
      res.json(tipos)
    } catch (error) {
      log.e(error.toString())
      res.status(500).json(ResponseError.generalError())
    } finally {
      next()
    }
  }
}