const DataTypes = require('sequelize').DataTypes
let instance
exports.define = (sequelize) => {
  instance = sequelize.define('Contatos', {
    idUsuario: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id',
      }
    },
    idContato: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id',
      }
    }
  })
}

exports.instance = instance