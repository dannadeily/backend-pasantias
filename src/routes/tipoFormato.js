const express = require('express');

const router = express.Router();
const tipoFormatoController = require('../controllers/tipoFormatoController');

router.get('/tipoFormato', tipoFormatoController.getAll);
module.exports= router;