const { response } = require('express');

const Compra = require('../models/compra');

//Peticiones a realizar:
// GET /compras: devolverá un listado en formato JSON del array de compras completo de la colección.
// GET /compras/:id: devolverá un objeto JSON con los datos de la compra encontrado a partir de su id.
// POST /compras: recogerá los datos de la compra que le llegarán en el cuerpo de la petición e insertará la compra en cuestión en la base de datos, devolviendo un objeto JSON con el libro insertado.
// PUT /compras/:id: recogerá los datos del compra que le llegarán en el cuerpo de la petición, y el id del compra a modificar de los parámetros de la URL, y realizará los cambios correspondientes, devolviendo un objeto JSON con el libro modificado.
// DELETE /compras/:id: eliminará el compra cuyo id se reciba como parámetro en la URL, devolviendo en formato JSON la compra borrada.

const obtenerCompras = async(req, res) => {
    Compra.find().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(500)
            .send({
                ok: false,
                error: "Error obteniendo compras"
            });
    });
}

const obtenerCompra = async(req, res) => {
    Compra.findById(req.params.id).then(resultado => {
        if (resultado)
            res.status(200)
            .send({ ok: true, resultado: resultado });
        else
            res.status(400)
            .send({
                ok: false,
                error: "No se han encontrado compras"
            });
    }).catch(error => {
        res.status(400)
            .send({
                ok: false,
                error: "Error buscando el compra indicado"
            });
    });
}

const crearCompra = async(req, res) => {
    console.log("Body que llega: ", req.body);
    let nuevoCompra = new Compra({
        titulo: req.body.titulo,
        editorial: req.body.editorial,
        precio: req.body.precio
    });

    nuevoCompra.save().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({
                ok: false,
                error: "Error añadiendo compra"
            });
    });
}

const actualizarCompra = async(req, res) => {
    Compra.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            editorial: req.body.editorial,
            precio: req.body.precio
        }
    }, { new: true }).then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({
                ok: false,
                error: "Error actualizando compra"
            });
    });
}

const borrarcompra = async(req, res) => {
    Compra.findByIdAndRemove(req.params.id)
        .then(resultado => {
            res.status(200)
                .send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400)
                .send({
                    ok: false,
                    error: "Error eliminando compra"
                });
        });
}




module.exports = { obtenerCompras, obtenerCompra, crearCompra, actualizarCompra, borrarCompra }