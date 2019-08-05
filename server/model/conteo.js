var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var conteoSchema = new Schema({
    ultimo: { type: Number, required: [true] },
    hoy: { type: Number, required: [true] }
});


module.exports = mongoose.model('Conteo', conteoSchema);