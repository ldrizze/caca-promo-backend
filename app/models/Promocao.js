const DataTypes = require('sequelize').DataTypes

module.exports = class Promocao {
  constructor () {
    this.instance = null
  }

  static define(sequelize) {
    this.instance = sequelize.define('Promocao', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_restaurante: {
        type: DataTypes.INTEGER
      },
      nome: {
        type: DataTypes.STRING(60)
      },
      descricao: {
        type: DataTypes.TEXT
      },
      data_inicio: {
        type: DataTypes.DATE
      },
      data_fim: {
        type: DataTypes.DATE
      },
      data_de_registro: {
        type: DataTypes.DATE
      }
    },
    {
      tableName: 'Promocoes'
    })
  }
}