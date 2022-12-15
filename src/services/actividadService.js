// const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const Actividad = require('../models/Actividad');
dotenv.config({ path: './.env' });


exports.getAll = async () => {
    try {
        const actividades= await Actividad.findAll();
        return {status: 200 ,actividades};
    } catch (error) {
        console.log(error);
        return {status:500};
    }
};
