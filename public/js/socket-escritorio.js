//comando para establecer la conexion

var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('escritorio')){

    window.location='index.html';
    alert('El escritorio es necesario');
    
}else{

    let escritorio = params.get('escritorio');
    
    $('h1').text(escritorio);

    $('button').on('click', function (){
        socket.emit('atenderTicket', {
            escritorio: escritorio
        }, function (resp) {
                if(resp.atenderTicket ==='No hay tickets' ){
                    alert(resp.atenderTicket)
                }else{
                    $('small').text(resp.atenderTicket.numero);
                }
                
        });
    });

    
}


