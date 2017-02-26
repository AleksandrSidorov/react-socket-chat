var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)

io.on('connection', function(socket) {
  console.log("Connection created")
  socket.on('new-message', function(msg) {
    console.log(msg)
    io.emit('recieve-message', msg)
  })
})

server.listen(3030, function() {
  const host = server.address().address
  const port = server.address().port
  console.log(`Express server is running on host ${host}:${port}`)
})
