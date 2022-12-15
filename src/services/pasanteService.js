// const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const { Op } = require('sequelize');
const { Usuario, Empresa, Jurados } = require('../models');

const Pasante = require('../models/Pasante');
dotenv.config({ path: './.env' });

exports.inscribirPasante = async (idUsuario, idEmpresa) => {
    try {
        const empresa = await Pasante.findOne({ where: { estados_idestado: 2, usuarios_idusuario: idUsuario } });
        if (empresa) {
            return { status: 400, message: 'Actualmente ya estas en proceso de pasantias' };
        }
        await Pasante.create({
            usuarios_idusuario: idUsuario,
            empresas_idempresa: idEmpresa
        });
        return { status: 201, message: 'Solicitud de pasasantia creada correctamente' };
    } catch (error) {
        console.log(error);
        return ({ status: 500 });
    }
};

exports.pasantesActivos = async () => {
    try {
        const pasantes = await Pasante.findAll({
            attributes: [
                'idpasante',
                'createdAt'
            ],
            where: {
                estados_idestado: { [Op.not]: [3, 4] }
            },
            include: [{
                model: Usuario
                ,
                attributes: ['nombres', 'apellidos',]
            },
            {
                model: Empresa,
                attributes: ['nombre']
            }
            ]
        });
        return { status: 200, pasantes };
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'A ocurrido un error al intentar obtener los pasantes activos' };
    }
};

exports.getPasante = async (id) => {
    try {
        const pasante = await Pasante.findOne({
            attributes: [
            ],
            where: {
                idpasante: id
            },
            include: [{
                model: Usuario
                ,
                attributes: ['nombres', 'apellidos', 'email', 'codigo', 'telefono', 'direccion', 'numero_identificacion', 'semestre']
            }
            ]
        });
        return { status: 200, pasante: pasante.usuario };
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'A ocurrido un error al intentar obtener los pasantes activos' };
    }
};

exports.getEmpresaAsignada = async (id) => {
    try {
        const empresa = await Pasante.findOne({
            attributes: [
            ],
            where: {
                idpasante: id
            },
            include: [{
                model: Empresa
                ,
                attributes: ['nombre']
            }
            ]
        });

        return empresa;
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Ha ocurrido un error, por favor inetnta mas tarde'
        };
    }
};

exports.getJuradosAsignados = async (id) => {
    try {
        const jurados = await Pasante.findOne({
            attributes: [],
            where: {
                idpasante: id
            },
            include: [{
                model: Jurados
                ,
                attributes: ['numero_jurado'],
                include: [{
                    model: Usuario,
                    attributes: ['nombres', 'apellidos'],
                }]
            }
            ]
        });
        return jurados;
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Ha ocurrido un error, por favor inetnta mas tarde'
        };
    }
};

exports.getByUsuario = async (idUsuario) => {
    try {
        const pasante = await Pasante.findOne({
            where: { usuarios_idusuario: idUsuario },
            include: [{
                model: Empresa
                ,
                attributes: ['nombre'],
            }, {
                model: Jurados,
                attributes: ['numero_jurado'],
                include: [{
                    model: Usuario,
                    attributes: ['nombres', 'apellidos'],
                }]
            }
            ]
        }
        );
        return pasante;
    } catch (error) {
        console.log(error);
        return ({
            status: 500,
            message: 'Ha ocurrido un error , por favor intenta mas tarde'
        });
    }
};