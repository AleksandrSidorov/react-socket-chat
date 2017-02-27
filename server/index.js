var express = require('express')
var path = require('path')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)

app.use (express.static(path.resolve(__dirname, '../ui/build')))

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../ui/build', 'index.html'))
})

io.on('connection', function(socket) {
  console.log("Connection created")
  socket.on('new-message', function(msg) {
    console.log(msg)
    io.emit('recieve-message', msg)
  })
})

server.listen(process.env.PORT || 3300, function() {
  const host = server.address().address
  const port = server.address().port
  console.log(`Express server is running on host ${host}:${port}`)
})
