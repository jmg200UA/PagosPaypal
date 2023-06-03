/*
Ruta base: /libros
*/

const { Router } = require('express');
const { obtenerLibros, obtenerLibro, crearLibro, actualizarLibro, borrarLibro } = require('../controllers/libro');

const router = Router();

//Llamada para obtener todos los libros
router.get('/', [
], obtenerLibros);

//Llamada para obtener un libro específico
router.get('/:id', [
], obtenerLibro);

//Llamada para crear un libro nuevo
router.post('/', [
], crearLibro);

//Llamada para editar un libro
router.put('/:id', [
], actualizarLibro);

//Llamada para borrar un libro
router.delete('/:id', [
], borrarLibro);


module.exports = router;