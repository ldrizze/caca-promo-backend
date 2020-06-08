const HelloControler = require('./controllers/HelloController')
const UsuarioController = require('./controllers/UsuarioController')
const AuthController = require('./controllers/AuthController')
const Session = require('./util/session')
const RestauranteController = require('./controllers/RestauranteController')
const TipoComidasController = require('./controllers/TipoComidasController')

// Controllers
const helloController = new HelloControler()
const usuarioController = new UsuarioController()
const authController = new AuthController()
const restauranteController = new RestauranteController()
const tipoComidasController = new TipoComidasController()

module.exports = (app) => {
  app.route('/')
    .get(helloController.sayHello.bind(helloController))

  // Tipo Comidas
  app.route('/tipo-comidas')
    .get(tipoComidasController.getAll.bind(tipoComidasController))

  // Users
  app.route('/users')
    .post(usuarioController.create.bind(usuarioController))

  app.route('/users/:userId')
    .get(Session.isAuth(['A', 'U']), usuarioController.get.bind(usuarioController))
    .put(Session.isAuth(['A', 'U']), usuarioController.update.bind(usuarioController))

  app.route('/users/:userId/favs')
    .get(Session.isAuth(), usuarioController.getComidasFavoritas.bind(usuarioController))

  app.route('/users/:userId/favs/:tipoComidaId')
    .post(Session.isAuth(), usuarioController.createComidasFavoritas.bind(usuarioController))
    .delete(Session.isAuth(), usuarioController.deleteComidasFavoritas.bind(usuarioController))

  // Restaurantes
  app.route('/restaurantes')
    .get(restauranteController.getAll.bind(restauranteController))
    .post(Session.isAuth(['A']), restauranteController.create.bind(restauranteController))

  app.route('/restaurantes/:restauranteId')
    .get(restauranteController.get.bind(restauranteController))
    .put(Session.isAuth(['A', 'R']), restauranteController.update.bind(restauranteController))

  app.route('/restaurantes/:restauranteId/promo')
    .post(Session.isAuth(['R']), restauranteController.promoCreate.bind(restauranteController))

  app.route('/current-promos')
    .get(restauranteController.promoGetAllByDate.bind(restauranteController))

  // Session
  app.route('/session')
    .post(authController.auth.bind(authController))

  app.route('/session/me')
    .get(Session.isAuth(), authController.me.bind(authController))
}
