const DataTypes = require('sequelize').DataTypes

module.exports = class ComidaFavoritaDefiner {
  constructor () {
    this.instance = null
  }

  static define (sequelize) {
    this.instance = sequelize.define('ComidaFavorita', {
      id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      id_tipo_comida: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
    },
    {
      tableName: 'Comida_Favorita'
    })
  }
}
