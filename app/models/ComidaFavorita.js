const DataTypes = require('sequelize').DataTypes
let instance
exports.define = (sequelize) => {
  instance = sequelize.define('ComidaFavorita', {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_comida: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  })
}

exports.instance = instance