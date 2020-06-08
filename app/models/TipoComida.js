const DataTypes = require('sequelize').DataTypes

module.exports = class TipoComidaDefiner {
  constructor () {
    this.instance = null
  }

  static define (sequelize) {
    this.instance = sequelize.define('TipoComida', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      nome: {
        type: DataTypes.STRING(60)
      }
    },
    {
      tableName:'Tipo_Comidas'
    })
  }
}
