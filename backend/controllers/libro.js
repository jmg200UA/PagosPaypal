const { response } = require('express');

const Libro = require('../models/libro');

//Peticiones a realizar:
// GET /libros: devolverá un listado en formato JSON del array de libros completo de la colección.
// GET /libros/:id: devolverá un objeto JSON con los datos del libro encontrado a partir de su id.
// POST /libros: recogerá los datos del libro que le llegarán en el cuerpo de la petición e insertará el libro en cuestión en la base de datos, devolviendo un objeto JSON con el libro insertado.
// PUT /libros/:id: recogerá los datos del libro que le llegarán en el cuerpo de la petición, y el id del libro a modificar de los parámetros de la URL, y realizará los cambios correspondientes, devolviendo un objeto JSON con el libro modificado.
// DELETE /libros/:id: eliminará el libro cuyo id se reciba como parámetro en la URL, devolviendo en formato JSON el libro borrado.

const obtenerLibros = async(req, res) => {
    Libro.find().then(resultado => {
        res.status(200)
           .send( {ok: true, resultado: resultado});
    }).catch (error => {
        res.status(500)
           .send( {ok: false, 
                   error: "Error obteniendo contactos"});
    });
}

const obtenerLibro = async(req, res) => {
    Libro.findById(req.params.id).then(resultado => {
        if(resultado)
            res.status(200)
               .send({ok: true, resultado: resultado});
        else
            res.status(400)
               .send({ok: false, 
                      error: "No se han encontrado libros"});
    }).catch (error => {
        res.status(400)
           .send({ok: false, 
                  error: "Error buscando el libro indicado"});
    }); 
}

const crearLibro = async(req, res) => {
    console.log("Body que llega: ", req.body);
    let nuevoLibro = new Libro({
        titulo: req.body.titulo,
        editorial: req.body.editorial,
        precio: req.body.precio
    });

    nuevoLibro.save().then(resultado => {
        res.status(200)
           .send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error: "Error añadiendo libro"});
    });
}

const actualizarLibro = async(req, res) => {
    Libro.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            editorial: req.body.editorial,
            precio: req.body.precio
        }
    }, {new: true}).then(resultado => {
        res.status(200)
           .send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error:"Error actualizando libro"});
    });
}

const borrarLibro = async(req, res) => {
    Libro.findByIdAndRemove(req.params.id)
    .then(resultado => {
        res.status(200)
           .send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error:"Error eliminando libro"});
    });
}




module.exports = { obtenerLibros, obtenerLibro, crearLibro, actualizarLibro, borrarLibro }