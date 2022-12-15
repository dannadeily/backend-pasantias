// const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const TipoDocumento = require('../models/TipoDocumento');
dotenv.config({ path: './.env' });


exports.getAll = async () => {
    try {
        const tiposDocumentos= await TipoDocumento.findAll();
        return {status: 200 ,tiposDocumentos};
    } catch (error) {
        console.log(error);
        return {status:500};
    }
};
