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

const app = express()
const sequelize = new Sequelize(config.database)
modelDefine(sequelize)
const port = process.env.PORT || 3000 // process.env.port for hosts enviroment

// setup body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  try {
    if (req.headers.authorization) {
      req.session = new Session(req.headers.authorization)
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
  log.i(`[REQUEST] ${req.url} ${JSON.stringify(req.body)} ${res.statusCode}`)
  next()
})

app.use((error, req, res, next) => {
  log.e(error instanceof Error ? error.toString() : error)
  log.i(`[REQUEST] ${req.url} ${JSON.stringify(req.body)} ${res.statusCode}`)
  next()
})

app.listen(port) // start server listening

console.log(`Listening on port: ${port}`)
