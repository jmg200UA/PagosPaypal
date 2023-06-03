const express = require('express');
const mongoose = require('mongoose');

const Libro = require(__dirname + "/models/libro");

mongoose.connect('mongodb://127.0.0.1:27017/librosV1'); // localhost 127.0.0.1
let app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
  });

app.use('/libros', require('./routes/libro'));