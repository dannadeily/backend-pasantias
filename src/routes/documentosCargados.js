const express = require('express');

const router = express.Router();
const documentosCargados = require('../controllers/documentosCargadosController');

//middle para proteger rutas
// const auth= require('../../middleware/auth');

router.post('/inicioPasantia/:idusuario', documentosCargados.cargarDocumentos);
router.get('/getDocumentosCargadosIniciales/:idusuario', documentosCargados.getDocumentosCargadosIniciales);
router.get('/getDocumentosCargadosAvances/:idusuario', documentosCargados.getDocumentosCargadosAvances);
router.get('/getDocumentosCargadosFinales/:idusuario', documentosCargados.getDocumentosCargadosFinales);

router.get('/getDocumentosCargadosInicialesByPasante/:idpasante', documentosCargados.getDocumentosCargadosInicialesByPasante);
router.get('/getDocumentosCargadosAvancesByPasante/:idpasante', documentosCargados.getDocumentosCargadosAvancesByPasante);
router.get('/getDocumentosCargadosFinalesByPasante/:idpasante', documentosCargados.getDocumentosCargadosFinalesByPasante);

module.exports= router;