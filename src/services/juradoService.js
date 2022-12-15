// const { check, validationResult } = require('express-validator');
const Jurado = require('../models/Jurado');
const { Pasante, Usuario, Empresa } = require('../models');

exports.asignarJurado = async (pasante, jurado1, jurado2, jurado3) => {
    try {
        await Jurado.create({
            pasantes_idpasante: pasante,
            usuarios_idusuario: jurado1,
            numero_jurado: 1
        });
        await Jurado.create({
            pasantes_idpasante: pasante,
            usuarios_idusuario: jurado2,
            numero_jurado: 2
        });
        await Jurado.create({
            pasantes_idpasante: pasante,
            usuarios_idusuario: jurado3,
            numero_jurado: 3
        });
        return {
            status: 200,
            message: 'Jurados asignados correctamente'
        };
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Ha ocurrido un error, por favor intenta mas tarde' };
    }
};

exports.getPasantesCargo = async (idUsuario) => {
    try {
        const pasantes = await Jurado.findAll({
            where: {
                usuarios_idusuario: idUsuario
            },
            attributes: ['createdAt'],
            include: [{
                model: Pasante,
                attributes: ['idpasante'],
                include: [{
                    model: Usuario,
                    attributes: ['nombres', 'apellidos']
                },{
                    model: Empresa ,
                    attributes: ['nombre']
                }
                ]
            }]
        });
        return pasantes;
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Ha ocurrido un error, por favor intenta mas tarde' };
    }
};


