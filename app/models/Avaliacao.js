const DataTypes = require('sequelize').DataTypes
let instance
exports.define = (sequelize) => {
  instance = sequelize.define('Avaliacao', {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Usuario',
        key: 'id',
      }
    },
    idRestaurante: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Restaurante',
        key: 'id',
      }
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


exports.instance = instance