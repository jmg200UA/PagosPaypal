const express = require('express');
const mongoose = require('mongoose');

const Compra = require(__dirname + "/models/compra");

mongoose.connect('mongodb://127.0.0.1:27017/compras'); // localhost 127.0.0.1
let app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

app.use('/compras', require('./routes/compra'));