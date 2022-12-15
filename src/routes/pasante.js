const express = require('express');

const router = express.Router();
const pasanteController = require('../controllers/pasanteController');

router.post('/pasante', pasanteController.inscribirPasante);
router.get('/pasantes', pasanteController.pasantesActivos);
router.get('/pasante/:id', pasanteController.getPasante);
router.get('/empresaasignada/:id', pasanteController.getEmpresaAsignada);
router.get('/juradosasignados/:id', pasanteController.getJuradosAsignados);
router.get('/infopasante/:id', pasanteController.getByUsuario);
module.exports= router;