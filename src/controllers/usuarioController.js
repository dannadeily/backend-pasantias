// const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');
// const { generarJWT } = require('../helpers/tokens');
const usuarioService = require('../services/usuarioService');


exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await usuarioService.login(email, password);
    res.json(user);
    //     const tokens = await userService.generateAuthTokens(user);
};

exports.register = async (req, res) => {
    const { nombres, apellidos, codigo, email, password, empresa } = req.body;
    const user = await usuarioService.register(nombres, apellidos, codigo, email, password, empresa);
    res.json(user);
};

exports.perfil = async (req, res) => {
    const { usuario } = req;
    res.json({
        usuario: {
            idusuario: usuario.idusuario,
            numeroDocumento: usuario.numero_identificacion,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            email: usuario.email,
            codigo: usuario.codigo,
            direccion: usuario.direccion,
            telefono:usuario.telefono,
            semestre:usuario.semestre,
            rol: usuario.roles_idrol
        }
    });
};

exports.registrarJurado = async (req, res) => {
    const { nombres, apellidos, password,   email,  } = req.body;
    console.log(req.body);
    const jurado = await usuarioService.registrarJurado(nombres, apellidos,password,  email,  );
    res.json(jurado);
};

exports.editarDatos = async (req, res)=>{
    const { nombres, apellidos, email, numeroIdentificacion, telefono,semestre,direccion } = req.body;
    console.log(req.body);
    const usuario= await usuarioService.editarDatos(numeroIdentificacion,nombres,apellidos,email,direccion,telefono,semestre);  
    res.json({usuario});
};

exports.cambiarPassword  = async (req, res)=>{
    const {email, password, newPassword, repeatPassword}= req.body;
    if(newPassword!==repeatPassword){
        return res.json({status:400,message:'La nueva contraseña no coincide'});
    }
    const usuario= await usuarioService.cambiarPassword(email,password,newPassword);
    res.json(usuario);
};

exports.getJurados = async (req, res)=>{
    const jurados = await usuarioService.getJurados();
    res.json(jurados);
};
