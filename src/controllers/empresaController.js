// const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');
// const { generarJWT } = require('../helpers/tokens');
const empresaService = require('../services/empresaService');


exports.login = async (req, res) => {
    const { email, password } = req.body;
    const empresa = await empresaService.login(email, password);
    res.json(empresa);
    //     const tokens = await userService.generateAuthTokens(user);
};

exports.register = async (req, res) => {
    const { nombre, razonSocial, nit, sectorEmpresa, actividad, email, password, telefono, direccion } = req.body;
    const empresa = await empresaService.register(nombre, razonSocial, nit, sectorEmpresa, actividad, email, password, telefono, direccion);
    res.json(empresa);
};

exports.perfil = async (req, res) => {
    const { usuario } = req;
    res.json(usuario);
};

exports.getEmpresasInactivas = async (req, res) => {
    const empresa = await empresaService.getEmpresasInactivas();
    res.json(empresa);
};

exports.getEmpresasActivas = async (req, res) => {
    const empresa = await empresaService.getEmpresasActivas();
    res.json(empresa);
};

exports.cargarConvenios= async (req, res)=>{
    const cargar = await empresaService.cargarConvenios(req.params.id,req.files.convenio);
    res.json(cargar);
};

exports.getEmpresa = async (req, res) => {
    const empresa = await empresaService.getEmpresa(req.params.id);
    res.json(empresa);
};