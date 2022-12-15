// const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const TipoFormato = require('../models/TipoFormato');
dotenv.config({ path: './.env' });


exports.getAll = async () => {
    try {
        const tiposFormatos= await TipoFormato.findAll();
        return {status: 200 ,tiposFormatos};
    } catch (error) {
        console.log(error);
        return {status:500};
    }
};
