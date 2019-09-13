$(document).ready(function () {

    $('.reg-btn').attr('disabled', true)
    var username = "anonymous";

    $("#Myusername").change(function () {
        if ($(this).val() != "") {
            $('.reg-btn').attr('disabled', false)
            username = $(this).val();
        }
    });

    $('.reg-btn').click(function () {
        var socket = io.connect("http:127.0.0.1/:3000", { query: 'loggeduser=1' + username });
        $('#register').modal('hide');
        $('.btn-compose').attr('disabled', false)
        $('#username').attr('disabled', true)
        $("#username").val(username);

    })

    $('#register').modal('setting', 'closable', false).modal('show');

    $('.btn-compose').click(function () {
        $('#compose_message').modal('show');
    });



    $('.send').click(function () {
        var myMsg = $('#myMessage').val();
        var receiver = $("#receiver").val();
        if (receiver == "") {
            receiver = 'group message'
        }
        sendMessage({ sender: username, receiver: receiver, message: myMsg })
    });

    socket.on("message", function (msg) {

        if (msg.receiver == 'group message') {

            $('.messages').append($('<div>', {
                class: "message other-message"
            }).text(msg.sender + msg.message).css("margin-top", "10px"), $("<br>"));

        } else if (msg.receiver == username) {
            $('.messages').append($('<div>', {
                class: "message other-message"
            }).text(msg.sender + " :  " + msg.message).css("margin-top", "10px"), $("<br>"));
        }

    });

    socket.on('online-count', function (data) {
        countOnline(data);
    })

    // utility funtions

    function sendMessage(message) {
        socket.emit("message", message);
        Swal.fire({
            type: 'success',
            title: 'Sent Successfully!',
            backdrop: 'rgba(0, 0, 0, 0.85)'
        });
        logSentMessage(message.message)
    }

    function logSentMessage(myMsg) {
        $('<div>', { class: "ui compact message_s message  my-message" }).append($('<p>').text(myMsg)).appendTo('.messages');
        $('#myMessage').val('');
        $('#receiver').val('');
    }

    function receivePrivateMessage(message) { }
    function receiveGroupMessage(message) { }
    function isTyping(message) { }
    function stopTyping(message) { }

    function countOnline(data) {
        $('.count').text("online : " + data.online)
    }

});