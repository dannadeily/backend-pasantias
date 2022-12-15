const express = require('express');

const router = express.Router();
const tipoDocumentoController = require('../controllers/tipoDocumentoController');

router.get('/tipoDocumento', tipoDocumentoController.getAll);
module.exports= router;