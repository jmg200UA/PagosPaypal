const mongoose = require('mongoose');

let compraSchema = new mongoose.Schema({
    nombre: { // Nombre de la compra
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    pago: { // id del pago
        type: String
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    }
});

let Compra = mongoose.model('compras', compraSchema);
module.exports = Compra;