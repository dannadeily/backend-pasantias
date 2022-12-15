// const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const SectorEmpresa = require('../models/SectorEmpresa');
dotenv.config({ path: './.env' });


exports.getAll = async () => {
    try {
        const sectoresEmpresa= await SectorEmpresa.findAll();
        return {status: 200 ,sectoresEmpresa};
    } catch (error) {
        console.log(error);
        return {status:500};
    }
};
