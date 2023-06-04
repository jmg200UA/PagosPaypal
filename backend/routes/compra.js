/*
Ruta base: /compras
*/

const { Router } = require('express');
const { obtenerCompras, obtenerCompra, crearCompra, actualizarCompra, borrarCompra } = require('../controllers/compra');

const router = Router();

//Llamada para obtener todas los compras
router.get('/', [], obtenerCompras);

//Llamada para obtener un compra específica
router.get('/:id', [], obtenerCompra);

//Llamada para crear una compra nueva
router.post('/', [], crearCompra);

//Llamada para editar una compra
router.put('/:id', [], actualizarCompra);

//Llamada para borrar una compra
router.delete('/:id', [], borrarCompra);


module.exports = router;