const DataTypes = require('sequelize').DataTypes

module.exports = class AvaliacaoDefiner {
  constructor () {
    this.instance = null
  }

  static define (sequelize) {
    this.instance = sequelize.define('Avaliacao', {
      id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      id_restaurante: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      pontuacao: {
        type: DataTypes.INTEGER
      },
      menssagem: {
        type: DataTypes.STRING(255)
      },
      data_de_registro: {
        type: DataTypes.DATE
      }
    })
  }
}
