var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var ticketSchema = new Schema({
    numero: { type: Number, required: true },
    escritorio: { type: String }
});


module.exports = mongoose.model('Ticket', ticketSchema);