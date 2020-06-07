module.exports = (sequelize) => {
  // Imports
  const UsuarioModelDefine = require('./models/Usuario')
  const RestauranteModelDefine = require('./models/Restaurante')
  const PromocaoModelDefine = require('./models/Promocao')
  const UsuariosRestauranteModelDefine = require('./models/UsuariosRestaurante')
  const AvaliacaoModelDefine = require('./models/Avaliacao').define
  const ContatoModelDefine = require('./models/Contatos').define
  const TipoComidaModelDefine = require('./models/TipoComida').define
  // const ComidaFavoritaModelDefine = require('./models/ComidaFavorita').define

  // Defines
  UsuarioModelDefine.define(sequelize)
  RestauranteModelDefine.define(sequelize)
  PromocaoModelDefine.define(sequelize)
  UsuariosRestauranteModelDefine.define(sequelize)
  // AvaliacaoModelDefine(sequelize)
  // ContatoModelDefine(sequelize)
  // TipoComidaModelDefine(sequelize)
  // ComidaFavoritaModelDefine(sequelize)) // N EXISTE


  // Associations
  UsuarioModelDefine.instance.hasOne(
    UsuariosRestauranteModelDefine.instance,
    {
      foreignKey: 'id_usuario'
    }
  )

  RestauranteModelDefine.instance.hasOne(
    UsuariosRestauranteModelDefine.instance,
    {
      foreignKey: 'id_restaurante'
    }
  )

  UsuariosRestauranteModelDefine.instance.belongsTo(
    UsuarioModelDefine.instance,
    {
      foreignKey: 'id_usuario'
    }
  )

  UsuariosRestauranteModelDefine.instance.belongsTo(
    RestauranteModelDefine.instance,
    {
      foreignKey: 'id_restaurante'
    }
  )
}
