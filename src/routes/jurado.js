const express = require('express');

const router = express.Router();
const juradosController = require('../controllers/juradoController');

//middle para proteger rutas
// const auth= require('../../middleware/auth');

router.post('/asignarjurados/:id', juradosController.asignarJurado);
router.get('/getPasantesAsignados/:id', juradosController.getPasantesCargo);

module.exports= router;