var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var activeUsers = [];
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('set-online', function (user) {
    activeUsers.push({ id: socket.id, username: user.username })
    socket.broadcast.emit('joined', user.username)
    setInterval(function () {
      socket.emit("online", activeUsers)
    }, 1000)

  })

  socket.on('typing', function (isTyping) {
    socket.broadcast.emit('typing', isTyping)
  })

  socket.on('stop-typing', function (stop_typing) {
    socket.broadcast.emit('stop-typing', stop_typing)
  })

  socket.on('check-username', function (username) {
    var found = false;
    for (let i = 0; i < activeUsers.length; i++) {
      if (activeUsers[i].username == username) {
        found = true;
        socket.emit('verify-username', '0');
        break;
      }
    }
    if (!found) {
      socket.emit('verify-username', '1');
    }
  })



  socket.on('message', function (msg) {
    socket.broadcast.emit("message", { receiver: msg.receiver, message: msg.message, sender: msg.sender });
  });

  socket.on('disconnect', function (e) {
    for (let i = 0; i < activeUsers.length; i++) {
      if (activeUsers[i].id == socket.id) {
        socket.broadcast.emit('leave', activeUsers[i].username)
        activeUsers.splice(i, 1);
        break;
      }

    }

  })
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});
