var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Ticket =  require('./ticket');

var conteoSchema = new Schema({
    ultimo: { type: Number, required: [true] },
    hoy: { type: Number, required: [true] },
    tickets:  [Ticket.schema],
    ultimosCuatro:  [Ticket.schema]
});


module.exports = mongoose.model('Conteo', conteoSchema);