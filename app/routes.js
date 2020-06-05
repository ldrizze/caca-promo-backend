const HelloControler = require('./controllers/HelloController')
const UsuarioController = require('./controllers/UsuarioController')
const AuthController = require('./controllers/AuthController')
const Session = require('./util/session')

// Controllers
const helloController = new HelloControler()
const usuarioController = new UsuarioController()
const authController = new AuthController()

module.exports = (app) => {
  app.route('/')
    .get(helloController.sayHello.bind(helloController))

  app.route('/users')
    .post(usuarioController.create.bind(usuarioController))

  app.route('/users/:userId')
    .get(Session.isAuth, usuarioController.get.bind(usuarioController))

  app.route('/session')
    .post(authController.auth.bind(authController))
}
