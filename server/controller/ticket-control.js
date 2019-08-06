
const Conteo = require('../model/conteo');
const Ticket = require('../model/ticket');

class TicketControl {

    constructor() {
       
       this.validarConteo();
    }

    async validarConteo(){
         try{
            
            this.conteo =   await this.getConteo();
            if(!this.conteo){
                console.log('1');
                await this.reiniciarConteo();
            }
            else if(this.conteo.hoy !== new Date().getDate()){
                console.log('2');
                await this.reiniciarConteo();
            }
        }
        catch(error){
            throw error;
        } 
    }

     async getConteo () {
        let conteo= await  Conteo.findOne()
          .then(function(c) {
                  return c;
          })
          .catch(function(err) {
              throw err;
          });
          
          return conteo;
      }
      
      
      async reiniciarConteo() {
        try{
            if(!this.conteo){
                this.conteo = new Conteo();
            }
            this.conteo.ultimo=0;
            this.conteo.hoy=new Date().getDate();
            this.conteo.tickets= [];
            this.conteo.ultimosCuatro= [];
            await this.saveConteo();
        }catch(error){
            throw error;
        } 
      }

      async siguienteTurno(){
          try{
            this.conteo.ultimo +=1;
            let nuevoTicket = new Ticket()
            nuevoTicket.numero=this.conteo.ultimo;
            this.conteo.tickets.push(nuevoTicket);
            let nuevo= await this.saveConteo()
            .then( (c)=>{
                  return 'Ticket '+ c.ultimo;
            })
            .catch(error =>{
              throw error;
            });
            return nuevo;
          }catch(error){
              throw error;
          }
      }

      async saveConteo(){
        this.conteo =  await  this.conteo.save({ runValidators: true })
        .then(function(c) {
            if (!c) {
                throw new Error('No se pudo actualizar el conteo');
            } else {
                return c;
            }
        })
        .catch(error =>{
            throw error;
          });
          return  this.conteo;
      }


      getUltimo(){
          if(this.conteo)
                return 'Ticket '+ this.conteo.ultimo;
            else{
                return;
            }
      }

       async atenderTicket(escritorio){
          if(this.conteo.tickets.length ===0){
              return 'No hay tickets';
          }

          let numeroTicket = this.conteo.tickets[0].numero;
          this.conteo.tickets.shift();// borra el primero

          let atenderTicket = {
              numero: numeroTicket,
              escritorio
          }
          this.conteo.ultimosCuatro.unshift(atenderTicket); // mete al principio del arreglo

          if(this.conteo.ultimosCuatro.length > 4){
               this.conteo.ultimosCuatro.splice(-1,1)  // borra el ultimo de la lista
          }

          await this.saveConteo()
          .catch(error =>{
            throw error;
          });

          return atenderTicket;
      }


      getUltimosCuatro(){
          if(this.conteo){
              return this.conteo.ultimosCuatro;
          }
          return [];
      }
}


module.exports = {
    TicketControl
}