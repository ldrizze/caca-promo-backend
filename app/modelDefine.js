module.exports = (sequelize) => {
  // Imports
  const UsuarioModelDefine = require('./models/Usuario')
  const RestauranteModelDefine = require('./models/Restaurante')
  const PromocaoModelDefine = require('./models/Promocao')
  const UsuariosRestauranteModelDefine = require('./models/UsuariosRestaurante')
  const AvaliacaoModelDefine = require('./models/Avaliacao')
  const ContatoModelDefine = require('./models/Contatos').define
  const TipoComidaModelDefine = require('./models/TipoComida').define
  // const ComidaFavoritaModelDefine = require('./models/ComidaFavorita').define

  // Defines
  UsuarioModelDefine.define(sequelize)
  RestauranteModelDefine.define(sequelize)
  PromocaoModelDefine.define(sequelize)
  UsuariosRestauranteModelDefine.define(sequelize)
  AvaliacaoModelDefine.define(sequelize)
  // ContatoModelDefine(sequelize)
  // TipoComidaModelDefine(sequelize)
  // ComidaFavoritaModelDefine(sequelize)) // N EXISTE


  // Associations
  // Promoções
  RestauranteModelDefine.instance.hasMany(
    PromocaoModelDefine.instance,
    {
      foreignKey: 'id_restaurante',
      as: 'promocoes'
    }
  )

  PromocaoModelDefine.instance.belongsTo(
    PromocaoModelDefine.instance,
    {
      foreignKey: 'id_restaurante'
    }
  )

  // Avaliações X Usuario X Restaurante
  RestauranteModelDefine.instance.hasOne(
    AvaliacaoModelDefine.instance,
    {
      foreignKey: 'id_restaurante'
    }
  )

  UsuarioModelDefine.instance.hasOne(
    AvaliacaoModelDefine.instance,
    {
      foreignKey: 'id_usuario'
    }
  )

  AvaliacaoModelDefine.instance.belongsTo(
    UsuarioModelDefine.instance
  )

  AvaliacaoModelDefine.instance.belongsTo(
    RestauranteModelDefine.instance
  )

  // Usuario X Restaurante
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
