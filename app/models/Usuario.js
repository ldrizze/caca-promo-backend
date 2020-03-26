const DataTypes = require('sequelize').DataTypes
let instance
exports.define = (sequelize) => {
  instance = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
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
      type: DataTypes.STRING(11)
    },
    data_de_registro: {
      type: DataTypes.DATE
    },
    tipo_de_usuario: {
      type: DataTypes.INTEGER
    }
  })
}

exports.instance = instance
