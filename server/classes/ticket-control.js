
const Conteo = require('../model/conteo');

class TicketControl {

    constructor() {
        this.ultimo=0;
        this.hoy = new Date().getDate();
        let  conteoBD = this.getConteo();

        if(conteoBD.hoy === this.hoy ){
            this.ultimo = conteoBD.ultimo;
            this.hoy = conteoBD.hoy;
        }else{
            this.reiniciarConteo();
        }
    }

    getConteo () {
        let conteo= Conteo.find()
          .then(function(c) {
                  return c;
          })
          .catch(function(err) {
              throw err;
          });
          return conteo;
      }
      
      
      reiniciarConteo() {
      
          let conteo = new Conteo({
              ultimo: this.ultimo,
              hoy: this.hoy
          });
      
          conteo = conteo.save()
          .then(function(c) {
              if (!c) {
                  throw new Error('No se pudo actualizar el conteo');
              } else {
                  return c;
              }
          })
          .catch(function(err) {
              throw err;
          });
      
      }

}


module.exports = {
    TicketControl
}