var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var users = []
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    if (msg.receiver != "") {
      socket.broadcast.emit(msg.receiver, msg.message);
      console.log("Receiver : "+msg.receiver + " : "+typeof msg.receiver)
      console.log("Message : "+msg.message+ " : "+typeof msg.message)
      console.log("Sender : "+msg.username + " : "+typeof msg.username)
    } else {
      socket.broadcast.emit('chat message', msg);

    }
  });
  // console.log(users)

});


http.listen(port, function () {
  console.log('listening on *:' + port);
});
