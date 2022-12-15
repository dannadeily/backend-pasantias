// const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Empresa = require('../models/Empresa');
dotenv.config({ path: './.env' });
const path = require('path');
const shortid = require('shortid');

exports.login = async (email, password) => {
    try {
        const empresa = await Empresa.findOne({ where: { email } });
        if (!empresa) {
            return { status: httpStatus.NOT_FOUND, message: 'El usuario no existe' };
        }
        if (!bcrypt.compareSync(password, empresa.password)) {
            return { status: httpStatus.UNAUTHORIZED, message: 'Contraseña incorrecta' };
        }
        return {
            status: 200, token: token(empresa), usuario: {
                id: empresa.idusuario,
                nombres: `${empresa.nombres} ${empresa.apellidos}`,
                email: empresa.email
            }
        };
    } catch (error) {
        console.log(error);
        return { status: 500 };
    }
};

exports.register = async (nombre, razonSocial, nit, sectorEmpresa, actividad, email, password, telefono, direccion) => {
    try {
        const empresa = await Empresa.findOne({ where: { email } });
        if (empresa) {
            return { status: 400, message: 'La empresa ya existe' };
        }
        await Empresa.create({
            nombre,
            razon_social: razonSocial,
            nit,
            sector_empresas_idsector_empresa: sectorEmpresa,
            actividades_idactividad: actividad,
            email,
            password,
            telefono,
            direccion
        });
        return { status: 201, message: 'Empresa registrada correctamente' };
    } catch (error) {
        console.log(error);
        return ({ status: 500 });
    }
};
const token = (empresa) => {
    return jwt.sign(
        {
            id: empresa.idusuario,
            nombre: `${empresa.nombres} ${empresa.apellidos}`,
            activo: empresa.activo,
            email: empresa.email,
            rol: empresa.rol_idrol,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        });
};

exports.changePassword = async (empresaname, password, newPassword) => {
    //falta validar que el password sea igual
    try {
        const empresa = await Empresa.update({ password: newPassword }, {
            where: {
                empresaname: empresaname
            }
        });
        return empresa;
    } catch (error) {
        console.log(error);
        return { status: 500 };
    }
};

exports.getEmpresasInactivas = async () => {
    try {
        const empresa = await Empresa.findAll({ attributes: ['idempresa', 'nombre', 'razon_social'], where: { activa: 0 } });
        return {
            status: 200, empresa
        };
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Error al obtener las empresas' };
    }
};

exports.getEmpresasActivas = async () => {
    try {
        const empresa = await Empresa.findAll({ attributes: ['idempresa', 'nombre', 'razon_social'], where: { activa: 1 } });
        return {
            status: 200, empresa
        };
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Error al obtener las empresas' };
    }
};

exports.cargarConvenios = async (idempresa, documento) => {
    const ruta = await guardarDocumento( documento);
    try {
        await Empresa.update({ activa: 1, convenio: ruta }, {
            where: {
                idempresa
            }
        });
        return { status: 200 };
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Ha ocurrido un error al cargar el convenio' };
    }
};

const guardarDocumento = ( documento) => {
    try {
        const extencion = path.extname(documento.name);
        const archivo = shortid.generate();
        const carpetaPublica= 'files/';
        const ruta= 'convenios/' + archivo + '.' + extencion;
        const rutaCompleta= carpetaPublica + ruta;
        documento.mv(rutaCompleta);
        return ruta;
    } catch (error) {
        console.log(error);
        return null;
    }
};

exports.getEmpresa = async (idempresa) => {
    try {
        const empresa = await Empresa.findByPk(idempresa,{
            attributes:
                ['nombre',
                    'razon_social',
                    'nit',
                    'email',
                    // 'actividad',
                    'telefono',
                    // 'sector',
                    'convenio']
            
        });
        return {
            status: 200, empresa
        };
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Error al obtener la empresa' };
    }
};