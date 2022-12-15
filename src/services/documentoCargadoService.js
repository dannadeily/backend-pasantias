const { QueryTypes } = require('sequelize');
// const { check, validationResult } = require('express-validator');
const DocumentosCargados = require('../models/DocumentoCargado');
const pasanteService = require('./pasanteService');
const shortid = require('shortid');
const path = require('path');
const db = require('../config/conexion');

exports.cargarDocumentos = async (archivos, idusuario) => {
    const pasante = await pasanteService.getByUsuario(idusuario);
    try {
        for (const id in archivos) {
            await DocumentosCargados.create({
                documentos_iddocumento: id,
                pasantes_idpasante: pasante.idpasante,
                ruta: cargarDocumentos(archivos[id])
            });
        }
        return { status: 200, message: 'Documentos cargados correctamente' };
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Ha ocurrido un error, por favor intenta mas tarde' };
    }
};

const cargarDocumentos = (documento) => {
    const nombreArchivo = documento.name.toString();
    try {
        const archivo = shortid.generate();
        const extencion = path.extname(nombreArchivo);
        const carpetaPublica = 'files/';
        const ruta = 'uploads/' + archivo + '.' + extencion;
        const rutaCompleta = carpetaPublica + ruta;
        documento.mv(rutaCompleta);
        return ruta;
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Ha ocurrido un error intentando cargar el documento' };
    }
};

exports.getDocumentosCargadosIniciales = async (id, esPasante=false ) => {
    let pasante = !esPasante ? await pasanteService.getByUsuario(id) : id;
    pasante = typeof pasante === 'object' ? pasante.idpasante : pasante;

    try {
        const documentos = db.query(
            `SELECT d.documento , dc.ruta 
            from documentos_cargados dc 
            join documentos d on d.iddocumento = dc.documentos_iddocumento 
            where pasantes_idpasante = ${pasante}
            and iddocumento_cargado  = (
                SELECT max(dc2.iddocumento_cargado)
                from documentos_cargados dc2
                where dc2.pasantes_idpasante = dc.pasantes_idpasante 
                and dc2.documentos_iddocumento = dc.documentos_iddocumento 	
            ) 
            and d.tipos_formatos_idformato = 1
            group by documentos_iddocumento`,
            {
                type: QueryTypes.SELECT
            });

        return documentos;
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Ha ocurrido un error, por favor intenta mas tarde' };
    }
};

exports.getDocumentosCargadosAvances = async (id, esPasante=false) => {
    let pasante = !esPasante ? await pasanteService.getByUsuario(id) : id;
    pasante = typeof pasante === 'object' ? pasante.idpasante : pasante;
    try {
        
        const documentos = db.query(
            `SELECT d.documento , dc.ruta 
            from documentos_cargados dc 
            join documentos d on d.iddocumento = dc.documentos_iddocumento 
            where pasantes_idpasante = ${pasante}
            and iddocumento_cargado  = (
                SELECT max(dc2.iddocumento_cargado)
                from documentos_cargados dc2
                where dc2.pasantes_idpasante = dc.pasantes_idpasante 
                and dc2.documentos_iddocumento = dc.documentos_iddocumento 	
            ) 
            and d.tipos_formatos_idformato = 2
            group by documentos_iddocumento`,
            {
                type: QueryTypes.SELECT
            });

        return documentos;
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Ha ocurrido un error, por favor intenta mas tarde' };
    }
};

exports.getDocumentosCargadosFinales = async (id, esPasante= false) => {
    let pasante = !esPasante ? await pasanteService.getByUsuario(id) : id;
    pasante = typeof pasante === 'object' ? pasante.idpasante : pasante;
    try {
        
        const documentos = db.query(
            `SELECT d.documento , dc.ruta 
            from documentos_cargados dc 
            join documentos d on d.iddocumento = dc.documentos_iddocumento 
            where pasantes_idpasante = ${pasante}
            and iddocumento_cargado  = (
                SELECT max(dc2.iddocumento_cargado)
                from documentos_cargados dc2
                where dc2.pasantes_idpasante = dc.pasantes_idpasante 
                and dc2.documentos_iddocumento = dc.documentos_iddocumento 	
            ) 
            and d.tipos_formatos_idformato = 3
            group by documentos_iddocumento`,
            {
                type: QueryTypes.SELECT
            });

        return documentos;
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Ha ocurrido un error, por favor intenta mas tarde' };
    }
};