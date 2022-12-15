// const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario.js');
const pasanteService = require('../services/pasanteService');
// const { use } = require('../routes/empresa/empresaRoutes.js');]
dotenv.config({ path: './.env' });


exports.login = async (email, password) => {
    try {
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return { status: httpStatus.NOT_FOUND, message: 'El usuario no existe' };
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return { status: httpStatus.UNAUTHORIZED, message: 'Contraseña incorrecta' };
        }
        return {
            status: 200, token: token(user), usuario: {
                idusuario: user.idusuario,
                nombres: `${user.nombres} ${user.apellidos}`,
                email: user.email,
                rol: user.roles_idrol
            }
        };
    } catch (error) {
        console.log(error);
        return { status: 500 };
    }
};

exports.register = async (nombres, apellidos, codigo, email, password, empresa) => {
    try {
        const user = await Usuario.findOne({ where: { email } });
        if (user) {
            return { status: 400, message: 'El usuario ya existe' };
        }
        const usuario = await Usuario.create({ nombres, apellidos, numero_identificacion: codigo, email, password });
        await pasanteService.inscribirPasante(usuario.idusuario, empresa);
        return { status: 201, message: 'Usuario creado correctamente' };
    } catch (error) {
        console.log(error);
        return ({ status: 500 });
    }
};
const token = (user) => {
    return jwt.sign(
        {
            id: user.idusuario,
            nombre: `${user.nombres} ${user.apellidos}`,
            activo: user.activo,
            email: user.email,
            rol: user.rol_idrol,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        });
};

exports.cambiarPassword = async (email, password, newPassword) => {
    try {
        const passwordExistente = await Usuario.findOne({
            attributes: ['password'],
            where: {
                email
            }
        }
        );
        console.log(passwordExistente.password);
        console.log(password);
        console.log(email);
        if (!bcrypt.compareSync(password, passwordExistente.password)) {
            return { status: 404, message: 'Contraseña incorrecta' };
        }
        await Usuario.update({ password: bcrypt.hashSync(newPassword, 10) }, {
            where: {
                email
            }
        });
        return { status: 200, message: 'Password actualizada correctamente' };

    } catch (error) {
        console.log(error);
        return { status: 500, message: 'intente nuevamente mas tarde' };
    }
};

exports.registrarJurado = async (nombres, apellidos, password, email) => {
    try {
        const user = await Usuario.findOne({ where: { email } });
        if (user) {
            return { status: 400, message: 'El usuario ya existe' };
        }
        await Usuario.create({ nombres, apellidos, password, email, roles_idrol: 3 });
        return { status: 201, message: 'Usuario creado correctamente' };
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Por favor intente de nuevo mas tarde' };
    }
};

exports.editarDatos = async (numero_identificacion, nombres, apellidos, email, direccion, telefono, semestre) => {
    try {
        await Usuario.update({
            numero_identificacion,
            nombres,
            apellidos,
            email,
            direccion,
            telefono,
            semestre,
        }, {
            where: {
                email
            }
        });
        return ({ status: 200, message: 'Datos editados correctamente' });
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Ha ocurrido un error , por favor intente mas tarde' };
    }
};

exports.getJurados = async () => {
    try {
        const jurados = Usuario.findAll({
            attributes: ['nombres', 'apellidos', 'idusuario']
            ,
            where: {
                roles_idrol: 3
            }
        });
        return jurados;
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Ha ocurrido un error , intenta mas tarde' };
    }
};