module.exports = (sequelize) => {
  // Imports
  const UsuarioModelDefine = require('./models/Usuario').define

  // Defines
  UsuarioModelDefine(sequelize)
}
