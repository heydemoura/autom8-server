require('dotenv').config({silent: true})
require('./config')

const fs = require('fs')
const path = require('path')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const db = require('./data.json')

// Initialize Controller
const GPIOController = require('./controllers/GPIOController')
global.gpio = new GPIOController(db.pins)

server.listen(+process.env.PORT || 3001, () => {
  console.log('>> Server started')
  // Initialize Events
  io.on('connection', socket => {
    console.log('>> Client connected', socket.id)
    fs.readdirSync(NAMESPACE_DIR).map(file => {
      let namespace = file.split('.js')[0]
      require(path.join(NAMESPACE_DIR, namespace))(io, socket, namespace)
    })
  })
})
