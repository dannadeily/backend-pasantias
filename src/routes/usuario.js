const express = require('express');

const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//middle para proteger rutas
const auth= require('../middleware/auth');

router.post('/login', usuarioController.login);
router.post('/user',usuarioController.register );
router.get('/perfil', auth ,usuarioController.perfil );
router.post('/jurado' ,usuarioController.registrarJurado );
router.post('/editarDatos' ,usuarioController.editarDatos );
router.put('/cambiarPassword' ,usuarioController.cambiarPassword );
router.get('/jurados' ,usuarioController.getJurados );
module.exports= router;