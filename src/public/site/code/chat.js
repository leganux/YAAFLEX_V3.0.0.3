var socket = io.connect('http://127.0.0.1:3000/chat', {
    reconnection: true,
    reconnectionDelay: 10000,
    reconnectionDelayMax: 50000,
    reconnectionAttempts: Infinity
});

socket.on('connect', function () {
    console.log('connected to server');
});

$(document).ready(function () {
    $('#Send_').click(function () {
        var valu = $('#msg').val()
        if (valu !== '') {
            socket.emit('chat:message', valu);
            $('#msg').val('')
        }
        return 0;
    });


    $('#msg').keypress(function (e) {
        if (e.which == 13) {
            var valu = $('#msg').val()
            if (valu !== '') {
                socket.emit('chat:message', valu);
                $('#msg').val('')
                $('#msg').val('')
            }
            return 0;
        }
    });


    socket.on('chat:message', function (msg) {
        $('#append_here').append('<hr><div class="row"> ' +
            '<div class="col-sm-1"></div>' +
            '<div class="col-sm-2">' +
            '<img class="img img-circle img-fluid img-fluid" src="http://icons.iconarchive.com/icons/hopstarter/halloween-avatar/128/Casper-icon.png" alt="avatar">' +
            '</div>' +
            '<div class="col-sm-6">' +
            '<div class="alert  alert-primary">' +
            '<small> <a herf="#">@username </a></small>' +
            '<br><strong>' + msg + '</strong>' +
            '</div>' +
            '</div>' +
            '<div class="col-sm-2">' +
            '<small>a minute ago </small>' +
            '</div><div class="col-sm-1">' +
            '</div>' +
            '</div>');

        $("#append_here").animate({ scrollTop: $('#append_here').prop("scrollHeight") }, 100);
    });
});