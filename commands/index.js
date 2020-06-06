const fs = require('fs')
const path = require('path')
const commands = []

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-11) === '.command.js'))
  .forEach((file) => {
    const command = require(path.join(__dirname, file))
    commands.push({
      name: file.substr(0, file.length - 11),
      command
    })
  })

module.exports = commands