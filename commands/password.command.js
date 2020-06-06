const Logger = require('../app/util/logger')
const bcrypt = require('bcrypt')
const logger = new Logger('BCRYPT')

module.exports = (program) => {
  program
    .command('pwdgen <stringToBcrypt>')
    .action((stringToBcrypt) => {
      const hash = bcrypt.hashSync(stringToBcrypt, 8)
      logger.i(hash)
    })
}