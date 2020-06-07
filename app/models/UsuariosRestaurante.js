const DataTypes = require('sequelize').DataTypes

module.exports = class Promocao {
  constructor () {
    this.instance = null
  }

  static define(sequelize) {
    this.instance = sequelize.define('UsuariosRestaurante', {
      id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id_usuario'
      },
      id_restaurante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id_restaurante'
      }
    }, {
      tableName: 'UsuariosRestaurante'
    })
  }
}