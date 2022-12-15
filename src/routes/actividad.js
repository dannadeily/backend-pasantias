const express = require('express');

const router = express.Router();
const actividadController = require('../controllers/actividadController');

router.get('/actividades', actividadController.getAll);
module.exports= router;