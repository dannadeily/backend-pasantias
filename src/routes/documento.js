const express = require('express');

const router = express.Router();
const documentoController = require('../controllers/documentoController');

//middle para proteger rutas
// const auth= require('../middleware/auth');

router.post('/documento', documentoController.crearDocumento);
router.get('/documentosIniciales', documentoController.getDocumentosIniciales);
router.get('/documentosAvances', documentoController.getDocumentosAvances);
router.get('/documentosFinales', documentoController.getDocumentosFinales);

module.exports= router;