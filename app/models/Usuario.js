const DataTypes = require('sequelize').DataTypes
module.exports = class UsuarioDefiner {
  constructor () {
    this.instance = null
  }

  static define (sequelize) {
    this.instance = sequelize.define('Usuario', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      usuario: {
        type: DataTypes.STRING(15)
      },
      nome: {
        type: DataTypes.STRING(60)
      },
      email: {
        type: DataTypes.STRING(45)
      },
      senha: {
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
        type: DataTypes.CHAR(8)
      },
      data_de_registro: {
        type: DataTypes.DATE
      },
      tipo_de_usuario: {
        type: DataTypes.ENUM('A', 'U', 'S', 'R')
      }
    }, {
      defaultScope: {
        attributes: { exclude: ['senha'] }
      },
      scopes: {
        withPassword: {
          attributes: {},
        }
      }
    })
  }
}
