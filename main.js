require('colors')
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const routes = require('./app/routes')
const config = require('./app/config')
const modelDefine = require('./app/modelDefine')
const Logger = require('./app/util/logger')
const log = new Logger('SYSTEM')
const Session = require('./app/util/session')
const cors = require('cors')

const app = express()
const sequelize = new Sequelize(config.database)
modelDefine(sequelize)
const port = process.env.PORT || 3000 // process.env.port for hosts enviroment

// setup body-parser
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      req.session = new Session(req.headers.authorization)
      await req.session.fillUser()
    }
  } catch(error) {
    log.e(`Auth token error: ${req.headers.authorization}`)
    log.e(error.toString())
  } finally {
    next()
  }
})

routes(app) // construct routes

// Log middleware
app.use((req, res, next) => {
  log.i(`${req.method} ${req.url} ${JSON.stringify(req.body)} ${res.statusCode}`)
  next()
})

app.listen(port) // start server listening

console.log(`Listening on port: ${port}`)
module.exports = app
