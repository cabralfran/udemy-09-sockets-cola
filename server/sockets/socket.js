const { io } = require('../server');
const {TicketControl} = require('../controller/ticket-control');



const ticketControl =new TicketControl();

io.on('connection', (client) => {
    
    client.on('solicitarNuevoTurno', async(data, callback) => {
        try{
            console.log('solicitarNuevoTurno');
            let nuevoTurno =  await ticketControl.siguienteTurno();
            return callback({
                turno: nuevoTurno
            });
        }catch(error){
            return callback({
                resp: 'Error al obtener el siguiente turno: ' + error.message
            });
        }
       
    });

    if(ticketControl){
            client.emit('enviarTurnoActual', {
                turno: ticketControl.getUltimo()
        });
    }

   client.on('atenderTicket',  async (data, callback) =>{

            if(!data.escritorio){
                return callback({
                    err: true,
                    message: 'El escritorio es requerido'
                })
            }


            let atenderTicket =  await ticketControl.atenderTicket(data.escritorio);

            client.broadcast.emit('ultimosCuatro', {
                ultimosCuatro: ticketControl.getUltimosCuatro()
            });

            return callback ({
                atenderTicket
            });
    });


    client.on('ultimosCuatro',  async (data, callback) =>{

        let ultimosCuatro =  await ticketControl.getUltimosCuatro();
        return callback ({
            ultimosCuatro
        });
});


});