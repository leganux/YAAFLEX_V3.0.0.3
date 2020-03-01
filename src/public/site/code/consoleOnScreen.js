var socket = io.connect('/console', {
    reconnection: true,
    reconnectionDelay: 10000,
    reconnectionDelayMax: 50000,
    reconnectionAttempts: Infinity,
    path: socketPath
});

socket.on('connect', function () {
    console.log('conectado')
});
socket.on('consola:log', function (msg) {
    $('#sp4console_').append(msg)
});

$('.clearconsole_').click(function () {
    $('#sp4console_').html('');
})

