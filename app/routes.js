const HelloControler = require('./controllers/HelloController')
const UsuarioController = require('./controllers/UsuarioController')

module.exports = (app) => {
  const helloController = new HelloControler()
  const usuarioController = new UsuarioController()

  app.route('/')
    .get(helloController.sayHello.bind(helloController))

  app.route('/users')
    .post(usuarioController.create.bind(usuarioController))
}
