// const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const shortid = require('shortid');
const path = require('path');
const Documento = require('../models/Documento');
dotenv.config({ path: './.env' });


exports.crearDocumento = async (nombre, documento, aprobacion, formato) => {
    try {
        const ruta = await cargarPlantilla(documento);
        await Documento.create(
            {
                documento: nombre,
                ruta: ruta,
                aprobacion: aprobacion,
                tipos_formatos_idformato:formato
            }
        );
        return { status: 201, message: 'Nuevo documento creado correctamente' };
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Ha ocurrido un error creando el documento' };
    }
};

const cargarPlantilla = (documento) => {
    const nombreArchivo = documento.name.toString();
    try {
        const archivo = shortid.generate();
        const extencion = path.extname(nombreArchivo);
        const ruta = 'files/formatos/' + archivo + extencion;
        documento.mv(ruta);
        return ruta;
    } catch (error) {
        console.log(error);
        return { status: 500, message: 'Ha ocurrido un error intentando cargar el documento' };
    }
};

exports.getDocumentosIniciales =async ()=>{
    try {
        const documentos= await Documento.findAll({
            where:{
                tipos_formatos_idformato:1
            }
        });
        return documentos;
    } catch (error) {
        console.log(error);
        return {status:500, message: 'Ha ocurrido un error , por favor intenta mas tarde'};
    }
};

exports.getDocumentosAvances =async ()=>{
    try {
        const documentos= await Documento.findAll({
            where:{
                tipos_formatos_idformato:2
            }
        });
        return documentos;
    } catch (error) {
        console.log(error);
        return {status:500, message: 'Ha ocurrido un error , por favor intenta mas tarde'};
    }
};

exports.getDocumentosFinales =async ()=>{
    try {
        const documentos= await Documento.findAll({
            where:{
                tipos_formatos_idformato:3
            }
        });
        return documentos;
    } catch (error) {
        console.log(error);
        return {status:500, message: 'Ha ocurrido un error , por favor intenta mas tarde'};
    }
};