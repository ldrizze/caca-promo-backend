const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const routes = require('./app/routes')
const config = require('./app/config')
const modelDefine = require('./app/modelDefine')

const app = express()
const sequelize = new Sequelize(config.database)
modelDefine(sequelize)
const port = process.env.PORT || 3000 // process.env.port for hosts enviroment

// setup body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app) // construct routes

app.listen(port) // start server listening

console.log(`Listening on port: ${port}`)
