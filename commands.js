// Requires
require('colors')
const program = require('commander')

// Variables
const Logger = require('./app/util/logger')
const systemLogger = new Logger('SYSTEM')

// Program
program.version('0.0.1')

// Load commands
const commands = require('./commands/index')
for (const command of commands) {
  if (command.command) {
    command.command(program)
  } else {
    systemLogger.i(`${command.name} not found`)
  }
}

// Run!
program.parse(process.argv)
