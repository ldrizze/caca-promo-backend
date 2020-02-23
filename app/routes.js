const HelloControler = require('./controllers/HelloController')
module.exports = (app) => {
  const helloController = new HelloControler()

  app.route('/')
    .get(helloController.sayHello)
}
