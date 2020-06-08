const DataTypes = require('sequelize').DataTypes

module.exports = class RestauranteDefiner {
  constructor () {
    this.instance = null
  }

  static define(sequelize) {
    this.instance = sequelize.define('Restaurante', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.STRING(60)
      },
      endereco: {
        type: DataTypes.STRING(255)
      },
      numero: {
        type: DataTypes.INTEGER
      },
      bairro: {
        type: DataTypes.STRING(255)
      },
      cep: {
        type: DataTypes.INTEGER
      },
      data_de_registro: {
        type: DataTypes.DATE
      }
    })
  }
}