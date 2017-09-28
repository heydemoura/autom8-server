require('dotenv').config({silent: true})

const fs = require('fs')
const path = require('path')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

server.listen(+process.env.PORT || 3001)

// Initialize Events
io.on('connection', socket => {
  fs.readdirSync(path.join(__dirname, '/namespaces')).map(file => {
    let namespace = file.split('.js')[0]
    require(path.join(__dirname, '/namespaces/', namespace))(socket, namespace)
  })
})

