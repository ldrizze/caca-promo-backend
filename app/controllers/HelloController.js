const Logger = require('../util/logger')
const log = new Logger('HelloController')

module.exports = class HelloController {
  async sayHello (request, response) {
    response.send('Hello!')
  }
}
