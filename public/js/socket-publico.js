var socket = io();


socket.on('ultimosCuatro', function (resp) {
    console.log('entro');
    setearUltimosCuatro(resp);
});

socket.emit('ultimosCuatro', null, function (resp) {
    setearUltimosCuatro(resp);
});

function setearUltimosCuatro (resp){

    if(resp && resp.ultimosCuatro){
        console.log(resp.ultimosCuatro);
        for ( var i = 0; i < resp.ultimosCuatro.length; i++) {
            var num = i+1;
            $('#lblTicket'+num).text(resp.ultimosCuatro[i].numero);
            $('#lblEscritorio'+num).text(resp.ultimosCuatro[i].escritorio);
        }
    }

}