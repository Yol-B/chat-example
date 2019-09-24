$(document).ready(function() {
    var socket = io();
    var cloned = $(".inbox").html();
    $('.reg-btn').attr('disabled', true)
    var username = "anonymous";

    $("#Myusername").change(function() {
        if ($(this).val() != "") {
            username = $(this).val();
            socket.emit('check-username', username)
            socket.on('verify-username', function(reply) {
                if (reply == '1') {
                    $('.reg-btn').attr('disabled', false)
                } else {
                    $('.reg-form').append($('<div>', {
                        class: "ui name-error pointing red basic label"
                    }).text("This username is taken!"))

                    $("#Myusername").keydown(function() {
                        $('.name-error').hide()
                    })
                }
            })
        }
    });


    socket.on('joined', function(user) {
        if (user == username) {
            addActivity("You", "joined")
        } else {
            addActivity(user, "joined")
        }
    })

    socket.on('leave', function(user) {
        addActivity(user, "left")
    })

    $('.reg-btn').click(function() {
        $("#Myusername").val("");
        $('#register').modal('hide');
        $('.btn-compose').attr('disabled', false)
        $('#username').attr('disabled', true)
        $("#username").val(username);
        socket.emit('set-online', {
            username: username
        })
        init();
    })

    $('#register').modal('setting', 'closable', false).modal('show');

    $('input').on("keypress", function() {
        socket.emit('typing', username)
    })

    //Listen on typing
    socket.on('typing', function(username) {
        $('.user-name').each(function() {
            if ($(this).text() == username) {
                $(this).append("<span>", {
                    id: "typing"
                }).text($(this).text() + '(typing)')
            }
        });
    })


    $(document).on('click', '.sendMe', function(e) {
        var receiver = $(this).attr("receiver").split("_")[1]
        var message = $(this).closest("div.form-area").find("input").val();
        if (receiver == 'gc') {
            inbox = "#groupchat-msg"
        } else {
            inbox = "#" + receiver + "-msg"
        }
        sendMessage({
            sender: username,
            receiver: receiver,
            message: message
        }, inbox)
        $(this).closest("div.form-area").find("input").val("")
    });

    function init() {
        $('.item-slider').slick({
            slidesToShow: 1,
            dots: true,
            slidesToScroll: 1,
            atoplay: false
        });

        setTimeout(function() {
            $('#loader').removeClass('active');
        }, 800);

    }

    socket.on("gc", function(msg) {
        receiveMessage(msg)
    });
    socket.on(username, function(msg) {
        receiveMessage(msg)
    });

    socket.on('online', function(data) {
        countOnline(data)
    })

    function addActivity(user, activity) {
        var color = 'green'
        if (activity == 'left') {
            color = 'red';
        }
        $('<p>', {
            class: "ui item"
        }).append("<i class = '" + color + " circle icon'></i>", $("<span>").text(user + " " + activity + " the room")).appendTo($('.my-activities'))
    }

    function sendMessage(message, inbox) {
        socket.emit("message", message);
        Swal.fire({
            type: 'success',
            title: 'Sent Successfully!',
            backdrop: 'rgba(0, 0, 0, 0.85)'
        });
        logSentMessage(message, inbox)
    }

    function logSentMessage(myMsg, inbox) {
        var inbox;
        $(inbox).append($('<div>', {
            class: "ui large right pointing blue label "
        }).css({
            padding: '10px',
            marginTop: '10px',
            maxWidth: "200px",
            wordWrap: 'break-word',
            float: 'right'
        }).text(myMsg.message), '<br clear="all" />');
        $('#myMessage').val('');
        $('#receiver').val('');
    }

    function receiveMessage(message) {
        var inbox = "";
        if (message.receiver == 'all') {
            inbox += '.groupMessage'
        } else if (message.receiver == username) {
            inbox += '.privateMessage'
        }

        $(inbox).append($('<div>', {
            class: "ui large left pointing teal  label "
        }).css({
            padding: '10px',
            marginTop: '10px',
            maxWidth: "200px",
            wordWrap: 'break-word'
        }).text(message.sender + " :  " + message.message), '<br clear="all" />');

    }

    function countOnline(data) {
        cloned = cloned.replace("template", "")
        $('.online-users').empty()
        $('.item-slider').slick('slickRemove', null, null, true);
        $(".item-slider").slick('slickAdd', cloned)
        $('.count').text((data.length - 1))
        data.forEach(user => {
            if (username != user) {
                var chatBox = cloned.replace("Group Chat", user).replace("groupchat-msg", user + "-msg").replace("receiver_gc", "receiver_" + user).replace("template", "").replace("groupmsg", "private_" + user).replace("message-gc", "message-" + user)
                $(".item-slider").slick('slickAdd', chatBox)
                $('<p>', {
                    class: "ui user item"
                }).append("<i class = 'green user icon'></i>", $("<span>", {
                    class: "user-name"
                }).text(user)).appendTo($('.online-users'))

            }
        });
    }
});