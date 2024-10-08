const io = require('socket.io')(3000, {
    cors: {
      origin: "*", // Allow all origins. Change this to your specific origin for better security.
      methods: ["GET", "POST"]
    }
  });
  

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    
    
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

const http = require('http').createServer();
http.listen(3000, '0.0.0.0');