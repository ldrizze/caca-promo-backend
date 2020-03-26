const DataTypes = require('sequelize').DataTypes
let instance
exports.define = (sequelize) => {
  instance = sequelize.define('TipoComida', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(60)
    }
  })
}

exports.instance = instance