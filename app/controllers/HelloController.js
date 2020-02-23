module.exports = class HelloController {
  async sayHello (request, response) {
    response.send('Hello!')
  }
}
