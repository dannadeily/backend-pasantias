const express = require('express');

const router = express.Router();
const empresaController = require('../controllers/empresaController');

//middle para proteger rutas
// const auth= require('../../middleware/auth');

router.post('/login', empresaController.login);
router.post('/empresa',empresaController.register );
router.get('/empresasinactivas' ,empresaController.getEmpresasInactivas);
router.get('/empresasactivas' ,empresaController.getEmpresasActivas);
router.get('/empresa/:id' ,empresaController.getEmpresa);
router.put('/cargarconvenio/:id' ,empresaController.cargarConvenios);
module.exports= router;