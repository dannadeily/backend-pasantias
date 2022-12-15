// const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');
// const { generarJWT } = require('../helpers/tokens');
const juradoService = require('../services/juradoService');

exports.asignarJurado = async (req, res)=>{
    const {id}= req.params;
    const {jurado1, jurado2, jurado3}= req.body;
    if( jurado1 === jurado2 || jurado2===jurado3 || jurado1===jurado3 ){
        return res.json({status:400, message:'Los jurados asignados no se pueden repetir'});
    }
    const jurados=await juradoService.asignarJurado(id,jurado1,jurado2,jurado3);
    return res.json (jurados);
};

exports.getPasantesCargo = async (req, res)=>{
    const {id}= req.params;
    const pasante = await juradoService.getPasantesCargo(id);
    res.json(pasante);
};