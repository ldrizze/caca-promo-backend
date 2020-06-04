module.exports = (sequelize) => {
  // Imports
  const UsuarioModelDefine = require('./models/Usuario')
  const RestauranteModelDefine = require('./models/Restaurante').define
  // const PromocaoModelDefine = require('./models/Promocao').define
  const AvaliacaoModelDefine = require('./models/Avaliacao').define
  const ContatoModelDefine = require('./models/Contatos').define
  const TipoComidaModelDefine = require('./models/TipoComida').define
  // const ComidaFavoritaModelDefine = require('./models/ComidaFavorita').define

  // Defines
  UsuarioModelDefine.define(sequelize)
  RestauranteModelDefine(sequelize)
  // PromocaoModelDefine(sequelize)
  AvaliacaoModelDefine(sequelize)
  ContatoModelDefine(sequelize)
  TipoComidaModelDefine(sequelize)
  // ComidaFavoritaModelDefine(sequelize))
}
