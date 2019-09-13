var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3001;
var activeUsers = []
var $ = require("jquery");

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});




io.on('connection', function (socket) {
  socket.on('set-online', function (user) {
    activeUsers.push({ userId: socket.id, username: user.username })
  })

  socket.on('message', function (msg) {
    socket.broadcast.emit("message", { receiver: msg.receiver, message: msg.message, sender: msg.sender });
  });
  setInterval(function () {
    socket.emit("online-count", { online: socket.client.conn.server.clientsCount })
  }, 50)

  socket.on('disconnect', function (e) {
    for (let user = 0; user < activeUsers.length; user++) {
      if (socket.id == activeUsers[user].userId ) {
        activeUsers.splice(activeUsers.indexOf(activeUsers[user]), 1);
        break;
      } 
    }
    console.log(activeUsers)
  })
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});
