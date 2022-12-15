// const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');
// const { generarJWT } = require('../helpers/tokens');
const pasanteService = require('../services/pasanteService');


exports.inscribirPasante = async (req, res)=>{
    const {idUsuario } = req.body;
    const pasante = await pasanteService.inscribirPasante(idUsuario);
    res.json(pasante);
};

exports.pasantesActivos = async (req,res) => {
    const pasantes = await pasanteService.pasantesActivos();
    res.json(pasantes);
};

exports.getPasante = async (req,res) => {
    const {id} = req.params;
    const pasantes = await pasanteService.getPasante(id);
    res.json(pasantes);
};

exports.getEmpresaAsignada = async (req,res) => {
    const {id} = req.params;
    const empresa = await pasanteService.getEmpresaAsignada(id);
    res.json(empresa);
};

exports.getJuradosAsignados = async (req,res) => {
    const {id} = req.params;
    const jurados = await pasanteService.getJuradosAsignados(id);
    res.json(jurados);
};

exports.getByUsuario = async (req, res)=>{
    const {id}= req.params;
    const pasante = await pasanteService.getByUsuario(id);
    res.json(pasante);
};