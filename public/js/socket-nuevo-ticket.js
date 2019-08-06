//comando para establecer la conexion

var socket = io();

socket.on('connect', function () {
    console.log('conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('Se perdió la conexión con el servidor');
});

socket.on('enviarTurnoActual', function (resp) {
    if(resp && resp.turno)
        $('#lblNuevoTicket').text(resp.turno)
});

$('#nuevoTicket').on('click', () =>{

    //enviar al servidor
    socket.emit('solicitarNuevoTurno', null, function (resp) {
        if(resp && resp.turno)
            $('#lblNuevoTicket').text(resp.turno)
    });


})