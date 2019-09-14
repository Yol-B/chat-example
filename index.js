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

  })
  setInterval(function () {
    socket.emit("online", activeUsers)
  },1000)

  socket.on('message', function (msg) {
    socket.broadcast.emit("message", { receiver: msg.receiver, message: msg.message, sender: msg.sender });
  });

  socket.on('disconnect', function (e) {
    for (let i = 0; i < activeUsers.length; i++) {
      if (activeUsers[i].id == socket.id) {
        activeUsers.splice(i, 1);
      }

    }

  })

});

http.listen(port, function () {
  console.log('listening on *:' + port);
});
