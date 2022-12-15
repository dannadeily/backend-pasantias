const express = require('express');

const router = express.Router();
const sectorEmpresaController = require('../controllers/sectorEmpresaController');

router.get('/sectorEmpresa', sectorEmpresaController.getAll);
module.exports= router;