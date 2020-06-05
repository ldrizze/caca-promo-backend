const DataTypes = require('sequelize').DataTypes
module.exports = class UsuarioDefiner {
  constructor () {
    this.instance = null
  }
  
  static define (sequelize) {
    this.instance = sequelize.define('Usuario', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      nome: {
        type: DataTypes.STRING(60)
      },
      email: { // TODO Adicionar ao documento
        type: DataTypes.STRING(45)
      },
      senha: { // TODO Adicionar ao documento
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
      cep: { // TODO Alterar tamanho no documento
        type: DataTypes.CHAR(8)
      },
      data_de_registro: {
        type: DataTypes.DATE
      },
      tipo_de_usuario: { // TODO Alterar para ENUM no documento
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
