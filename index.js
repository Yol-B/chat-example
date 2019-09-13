var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3001;
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});




io.on('connection', function (socket) {
  socket.on('set-online', function (user) {
    console.log(user.username + " is connected!")
  })
  console.log(socket.client.conn);

  socket.on('message', function (msg) {
    socket.broadcast.emit("message", { receiver: msg.receiver, message: msg.message, sender: msg.sender });
  });
  setInterval(function () {
    socket.emit("online-count", { online: socket.client.conn.server.clientsCount })
  }, 50)

  socket.on('disconnect',function(e){
    console.log("offline : "+socket.id);
  })
});



http.listen(port, function () {
  console.log('listening on *:' + port);
});
